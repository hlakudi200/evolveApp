"use client";

import { useState, useRef, useEffect } from "react";
import { Card, Select, Input, Button, Typography, Spin, Alert } from "antd";
import {
  ITaxi,
  IDriver,
  IRoute,
  IFacility,
  ILane,
} from "@/providers/interfaces";
import { DownloadOutlined, FilePdfOutlined } from "@ant-design/icons";
import styles from "./styles/styles";
import { jsPDF } from "jspdf";


const { TextArea } = Input;
const { Option } = Select;
const { Title} = Typography;

interface IPrompt {
  driverperformance: string;
  taxistatus: string;
  routeefficiency: string;
  facilitystatus: string;
  paymentsummary: string;
}

interface TaxiReportSelectorProps {
  drivers: IDriver[];
  taxis: ITaxi[];
  routes: IRoute[];
  facilities: IFacility[];
  lanes: ILane[];
}

const predefinedPrompts = {
  driverperformance:
    "Generate a report on the top-performing drivers, license status, and activity levels.",
  taxistatus:
    "Give me a summary of taxi assignments, route distribution, and which taxis are full.",
  routeefficiency: "Compare route usage, fare prices, and travel times.",
  facilitystatus:
    "List the facilities at the rank and whether they are operational.",
  paymentsummary:
    "Summarize all driver payments, their total amounts, and payout status.",
};

// Helper function to format markdown text
const formatMarkdownText = (text: string) => {
    if (!text) return null;
  
    const lines = text.split("\n");
  
    return lines.map((line, index) => {
      // Headers (#, ##, ###)
      if (line.match(/^#{1,3}\s/)) {
        const headerLevel = line.match(/^(#+)/)?.[0].length || 1;
        const headerText = line.replace(/^#+\s/, "").trim();
  
        const headerStyle =
          headerLevel === 1
            ? styles.heading1
            : headerLevel === 2
            ? styles.heading2
            : styles.heading3;
  
        return (
          <div key={index} style={headerStyle}>
            {headerText}
          </div>
        );
      }
  
      // Bullet points
      else if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const itemText = line.trim().replace(/^[*-]\s/, "").replace(/\*\*/g, "").replace(/__/g, "");
        return (
          <div key={index} style={styles.listItem}>
            • {itemText}
          </div>
        );
      }
  
      // Numbered list
      else if (line.trim().match(/^\d+\.\s/)) {
        const numberMatch = line.trim().match(/^(\d+)\.\s/);
        const itemText = line.trim().replace(/^\d+\.\s/, "").replace(/\*\*/g, "").replace(/__/g, "");
        return (
          <div key={index} style={styles.listItem}>
            {numberMatch?.[1]}. {itemText}
          </div>
        );
      }
  
      // Markdown table header or row
      else if (line.includes("|")) {
        return (
          <div
            key={index}
            style={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              ...styles.paragraph,
            }}
          >
            {line}
          </div>
        );
      }
  
      // Regular paragraph (strip bold/italic markdown)
      else if (line.trim()) {
        const cleanedLine = line
          .replace(/(\*\*|__)(.*?)\1/g, "$2") // Bold
          .replace(/(\*|_)(.*?)\1/g, "$2"); // Italic
  
        return (
          <div key={index} style={styles.paragraph}>
            {cleanedLine}
          </div>
        );
      }
  
      // Empty line
      return <div key={index} style={{ height: "10px" }} />;
    });
  };
  
const TaxiReportSelector = ({
  drivers = [],
  taxis = [],
  routes = [],
  facilities = [],
  lanes = [],
}: TaxiReportSelectorProps) => {
  const [selectedReport, setSelectedReport] = useState<
    keyof IPrompt | "custom"
  >("driverperformance");
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reportTitle, setReportTitle] = useState("AI Generated Report");
  const [isMobile, setIsMobile] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobileView();

    // Add resize listener
    window.addEventListener("resize", checkMobileView);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const handleGenerate = async () => {
    const prompt =
      selectedReport === "custom"
        ? customPrompt
        : predefinedPrompts[selectedReport];

    if (!prompt) return;

    // Set report title based on selection
    setReportTitle(
      selectedReport === "custom"
        ? "Custom AI Report"
        : `${
            selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)
          } Report`
    );

    // Augment the prompt with actual data to provide context for the AI
    const dataContext = {
      driverCount: drivers.length,
      taxiCount: taxis.length,
      routeCount: routes.length,
      facilityCount: facilities.length,
      laneCount: lanes.length,
      // Add additional relevant data based on the report type
      activeTaxis: taxis.filter((taxi) => !taxi.isFull).length,
      fullTaxis: taxis.filter((taxi) => taxi.isFull).length,
      activeDrivers: drivers.filter((driver) => driver.isActive).length,
      availableRoutes: routes.length,
      operationalFacilities: facilities.filter(
        (facility) => facility.isOperational
      ).length,
    };

    // Ask the AI to use markdown formatting for better presentation
    const enhancedPrompt = `${prompt}
    
Please use markdown formatting in your response:
- Use # for main headings
- Use ## for subheadings
- Use bullet points (*) for lists
- Use bold (**text**) for emphasizing important information
- Organize the report in a clear, structured way

Context Data: ${JSON.stringify(dataContext)}

Analyze the following data:
Drivers: ${JSON.stringify(drivers)}
Taxis: ${JSON.stringify(taxis)}
Routes: ${JSON.stringify(routes)}
Facilities: ${JSON.stringify(facilities)}
Lanes: ${JSON.stringify(lanes)}`;

    setLoading(true);
    setReport(null);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
      const apiUrl =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

      const res = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: enhancedPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(
          `API Error: ${data.error.message || JSON.stringify(data.error)}`
        );
      }

      // Extract the text from Gemini API response format
      const generatedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No report generated.";
      setReport(generatedText);
    } catch (err) {
      console.error("GoogleApi:", err);
      setError(
        "Failed to generate report. Please check your API key configuration."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to download the report as a text file
  const handleDownload = () => {
    if (!report) return;

    const date = new Date().toISOString().split("T")[0];
    const filename = `${reportTitle
      .replace(/\s+/g, "-")
      .toLowerCase()}-${date}.txt`;
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });

    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
  };

  // Function to download as PDF
  const handlePDFDownload = () => {
    if (!report) return;

    try {
      // Create new PDF document
      const pdf = new jsPDF();

      // Add title
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text(reportTitle, 20, 20);

      // Add date
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const date = new Date().toLocaleDateString();
      pdf.text(`Generated on: ${date}`, 20, 30);

      // Add a divider line
      pdf.setLineWidth(0.5);
      pdf.line(20, 35, 190, 35);

      // Process the report content
      pdf.setFontSize(11);

      // Split the report into sections based on markdown headings
      const lines = report.split("\n");
      let y = 45; // Starting y position after title and date

      for (const line of lines) {
        // Check if we need a new page
        if (y > 270) {
          pdf.addPage();
          y = 20; // Reset y position for new page
        }

        // Handle headers
        if (line.match(/^#{1,3}\s/)) {
          const headerLevel = line.match(/^(#+)/)?.[0].length || 1;
          const headerText = line.replace(/^#+\s/, "");

          // Different styling based on header level
          if (headerLevel === 1) {
            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
          } else if (headerLevel === 2) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
          } else {
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
          }

          pdf.text(headerText, 20, y);
          y += 8;

          // Reset font for normal text
          pdf.setFontSize(11);
          pdf.setFont("helvetica", "normal");
        }
        // Handle bullet points
        else if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
          const itemText = line.trim().replace(/^[*-]\s/, "• ");

          // Split long bullet points
          const splitText = pdf.splitTextToSize(itemText, 170);
          pdf.text(splitText, 20, y);
          y += 6 * splitText.length;
        }
        // Handle numbered lists
        else if (line.trim().match(/^\d+\.\s/)) {
          const splitText = pdf.splitTextToSize(line.trim(), 170);
          pdf.text(splitText, 20, y);
          y += 6 * splitText.length;
        }
        // Regular paragraphs
        else if (line.trim()) {
          // Remove markdown formatting from regular text
          let cleanLine = line.replace(/(\*\*|__)(.*?)\1/g, "$2"); // Bold
          cleanLine = cleanLine.replace(/(\*|_)(.*?)\1/g, "$2"); // Italic

          const splitText = pdf.splitTextToSize(cleanLine, 170);
          pdf.text(splitText, 20, y);
          y += 6 * splitText.length;
        }
        // Empty line
        else {
          y += 4;
        }
      }

      // Save the PDF
      const filename = `${reportTitle
        .replace(/\s+/g, "-")
        .toLowerCase()}-${date}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF Generation Error:", err);
      setError("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <Card
      title="AI Report Generator"
      style={styles.container}
      bodyStyle={styles.cardBody}
    >
      <div style={styles.formContainer}>
        <Select
          value={selectedReport}
          onChange={setSelectedReport}
          style={styles.select}
        >
          <Option value="driverperformance">🧑‍✈️ Driver Performance</Option>
          <Option value="taxistatus">🚖 Taxi Status</Option>
          <Option value="routeefficiency">📍 Route Efficiency</Option>
          <Option value="facilitystatus">🏗️ Facility Operational</Option>
          <Option value="paymentsummary">💸 Driver Payment Summary</Option>
          <Option value="custom">🧠 Custom Prompt</Option>
        </Select>

        {selectedReport === "custom" && (
          <TextArea
            rows={4}
            placeholder="Enter your custom AI prompt here..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            style={styles.textArea}
          />
        )}

        <Button
          type="primary"
          onClick={handleGenerate}
          loading={loading}
          style={isMobile ? styles.generateButton : { width: "auto" }}
        >
          Generate Report
        </Button>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          style={{ marginTop: "16px" }}
          showIcon
        />
      )}

      {loading && (
        <div style={styles.loadingContainer}>
          <Spin size="large" tip="Generating report..." />
        </div>
      )}

      {report && (
        <div style={styles.reportContainer} ref={reportRef}>
          <div style={styles.reportHeader}>
            <Title level={4}>📄 {reportTitle}</Title>
            <div style={styles.buttonContainer}>
              <Button
                type="default"
                icon={<DownloadOutlined />}
                onClick={handleDownload}
              >
                Download TXT
              </Button>
              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                onClick={handlePDFDownload}
              >
                Download PDF
              </Button>
            </div>
          </div>

          <div style={styles.reportContent}>
            <div style={styles.reportText}>
              <div style={styles.formattedText}>
                {formatMarkdownText(report)}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaxiReportSelector;
