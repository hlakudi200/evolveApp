"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  DatePicker,
  Space,
  Empty,
  Statistic,
  Avatar,
  Divider,
  Badge,
  Skeleton,
  Tag,
  Button,
  Progress,
  Col,
  Row,
  List,
  Select,
  Segmented,
} from "antd";
import {
  WalletOutlined,
  RiseOutlined,
  FallOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  BankOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SafetyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useDriverState, useDriverActions } from "@/providers/driver";
import { useAuthState } from "@/providers/auth";
import styles from "./styles/styles.module.css";
import { IDriver, IPayment } from "@/providers/interfaces";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface MonthData {
  month: number;
  year: number;
  total: number;
  count: number;
  payments: IPayment[];
}

interface MonthlyDataMap {
  [key: string]: MonthData;
}

type ViewModeType = "card" | "list";

const Wallet: React.FC = () => {
  const { Driver, isPending, isError } = useDriverState() as {
    Driver: IDriver | null;
    isPending: boolean;
    isError: boolean;
  };
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [filteredPayments, setFilteredPayments] = useState<IPayment[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [todayAmount, setTodayAmount] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewModeType>("card");
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());
  const [monthlyData, setMonthlyData] = useState<MonthlyDataMap>({});
  const { currentUser } = useAuthState();
  const { getDriver } = useDriverActions();

  // Process and filter payments
  useEffect(() => {
    if (!Driver?.payments || !Array.isArray(Driver.payments)) {
      setFilteredPayments([]);
      setTotalAmount(0);
      setTodayAmount(0);
      return;
    }

    // Sort payments by date (newest first)
    const sortedPayments = [...Driver.payments].sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
    );

    // Apply date filter if range is selected
    let filtered = sortedPayments;
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].startOf("day");
      const endDate = dateRange[1].endOf("day");

      filtered = sortedPayments.filter((payment) => {
        const paymentDate = dayjs(payment.paymentDate);
        return paymentDate.isAfter(startDate) && paymentDate.isBefore(endDate);
      });
    }

    // Calculate total for filtered payments
    const total = filtered.reduce((sum, payment) => sum + payment.amount, 0);
    setTotalAmount(total);

    // Calculate today's earnings
    const today = dayjs().startOf("day");
    const todayEarnings = sortedPayments
      .filter((payment) => dayjs(payment.paymentDate).isAfter(today))
      .reduce((sum, payment) => sum + payment.amount, 0);
    setTodayAmount(todayEarnings);

    // Process monthly data
    const monthData: MonthlyDataMap = {};
    sortedPayments.forEach((payment) => {
      const month = dayjs(payment.paymentDate).month();
      const year = dayjs(payment.paymentDate).year();
      const key = `${year}-${month}`;

      if (!monthData[key]) {
        monthData[key] = {
          month,
          year,
          total: 0,
          count: 0,
          payments: [],
        };
      }

      monthData[key].total += payment.amount;
      monthData[key].count += 1;
      monthData[key].payments.push(payment);
    });

    setMonthlyData(monthData);
    setFilteredPayments(filtered);
  }, [Driver?.payments, dateRange]);

  const formatCurrency = (amount: number): string => {
    return `R ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("DD MMM YYYY, HH:mm");
  };

  // Get status color
  const getStatusColor = (status: string | undefined): string => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const handleRefresh = () => {
    if (currentUser?.id) {
      getDriver(currentUser.id);
    }
  };

  // Get status icon
  const getStatusIcon = (status: string | undefined): React.ReactNode => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return <CheckCircleOutlined />;
      case "pending":
        return <LoadingOutlined />;
      case "failed":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  // Generate month options for the select
  const getMonthOptions = (): { value: number; label: string }[] => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.map((month, index) => ({
      value: index,
      label: month,
    }));
  };

  // Mask sensitive data
  const maskString = (
    str: string | undefined,
    visibleStart: number = 2,
    visibleEnd: number = 4
  ): string => {
    if (!str) return "N/A";
    if (str.length <= visibleStart + visibleEnd) return str;

    const start = str.substring(0, visibleStart);
    const end = str.substring(str.length - visibleEnd);
    const middle = "•".repeat(
      Math.min(8, str.length - (visibleStart + visibleEnd))
    );

    return `${start}${middle}${end}`;
  };

  // Card rendering for each payment
  const renderPaymentCard = (payment: IPayment): React.ReactNode => (
    <Card key={payment.id} className={styles.paymentCard} bordered={false}>
      <div className={styles.paymentHeader}>
        <Avatar
          size={42}
          icon={<BankOutlined />}
          className={styles.paymentAvatar}
        />
        <div className={styles.paymentInfo}>
          <Text strong className={styles.paymentAmount}>
            {formatCurrency(payment.amount)}
          </Text>
          <Text type="secondary" className={styles.paymentDate}>
            {formatDate(payment.paymentDate)}
          </Text>
        </div>
        <Badge
          status={
            getStatusColor(payment.status) as
              | "success"
              | "warning"
              | "error"
              | "default"
              | "processing"
          }
          text={
            <Space>
              {getStatusIcon(payment.status)}
              <span>{payment.status || "Unknown"}</span>
            </Space>
          }
          className={styles.paymentStatus}
        />
      </div>

      <Divider className={styles.paymentDivider} />

      <div className={styles.paymentDetails}>
        <div className={styles.paymentDetail}>
          <Text type="secondary">Transaction Ref:</Text>
          <Space>
            <Text>{maskString(payment.transactionReference)}</Text>
            <SafetyOutlined title="This information is masked for security" />
          </Space>
        </div>
      </div>
    </Card>
  );

  // Handle date range change
  const handleDateRangeChange = (
    dates: null | [Dayjs | null, Dayjs | null]
  ): void => {
    setDateRange(dates || [null, null]);
  };

  // Handle month change
  const handleMonthChange = (value: number): void => {
    setSelectedMonth(value);
  };

  // Monthly summary card
  const renderMonthlySummary = (): React.ReactNode => {
    const currentYear = dayjs().year();
    const key = `${currentYear}-${selectedMonth}`;
    const data = monthlyData[key] || { total: 0, count: 0 };

    return (
      <Card className={styles.monthlySummaryCard}>
        <div className={styles.monthlySummaryHeader}>
          <div>
            <Title level={4} className={styles.monthTitle}>
              {dayjs().month(selectedMonth).format("MMMM")} Summary
            </Title>
            <Text type="secondary">{currentYear}</Text>
          </div>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            options={getMonthOptions()}
            style={{ width: 120 }}
          />
        </div>

        <div className={styles.monthlySummaryStats}>
          <Statistic
            title="Total Earnings"
            value={data.total}
            prefix="R"
            precision={2}
            valueStyle={{ color: "#1890ff" }}
          />
          <Statistic
            title="Number of Payments"
            value={data.count}
            valueStyle={{ color: "#52c41a" }}
          />
        </div>

        <div className={styles.monthlyChartContainer}>
          <Progress
            percent={Math.min(100, (data.total / 10000) * 100)}
            strokeColor={{
              "0%": "#1890ff",
              "100%": "#52c41a",
            }}
            format={() => formatCurrency(data.total)}
            className={styles.monthlyChart}
          />
          <Text type="secondary">Target: R 10,000.00</Text>
        </div>
      </Card>
    );
  };

  return (
    <div className={styles.walletContainer}>
      {isPending ? (
        <div className={styles.loadingContainer}>
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      ) : isError ? (
        <Empty
          description="Error loading wallet data"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <>
          <div className={styles.walletHeader}>
            <Card className={styles.balanceCard}>
              <div className={styles.balanceHeader}>
                <Space>
                  <WalletOutlined className={styles.walletIcon} />
                  <Text className={styles.balanceTitle}>Wallet Balance</Text>
                </Space>
              </div>
              <Title level={2} className={styles.balanceAmount}>
                {formatCurrency(totalAmount)}
              </Title>
              <Space className={styles.todayEarning}>
                <Text style={{ color: "white" }}>Today&apos;s Earnings: </Text>
                <Text strong className={styles.todayAmount}>
                  {formatCurrency(todayAmount)}
                </Text>
                {todayAmount > 0 ? (
                  <RiseOutlined className={styles.riseIcon} />
                ) : (
                  <FallOutlined className={styles.fallIcon} />
                )}
              </Space>
              <div>
                <Button
                  type="default"
                  icon={<ReloadOutlined spin={isPending} />}
                  onClick={handleRefresh}
                  className={styles.refreshButton}
                >
                  Refresh
                </Button>
              </div>
            </Card>

            <Card className={styles.filterCard}>
              <Title level={5}>Filter Transactions</Title>
              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                <RangePicker
                  onChange={handleDateRangeChange}
                  className={styles.datePicker}
                  placeholder={["Start Date", "End Date"]}
                  allowClear
                  format="DD/MM/YYYY"
                />
                <div className={styles.filterActions}>
                  <Text>
                    {filteredPayments.length} transaction
                    {filteredPayments.length !== 1 ? "s" : ""} found
                  </Text>
                  <Button
                    type="default"
                    icon={<DownloadOutlined />}
                    className={styles.downloadButton}
                  >
                    Export
                  </Button>
                </div>
              </Space>
            </Card>
          </div>

          <Row gutter={24} className={styles.mainContent}>
            <Col xs={24} lg={16}>
              <Card
                title={
                  <div className={styles.transactionsHeader}>
                    <span>Transaction History</span>
                    <Segmented
                      options={[
                        { value: "card", icon: <AppstoreOutlined /> },
                        { value: "list", icon: <BarsOutlined /> },
                      ]}
                      value={viewMode}
                      onChange={(value) => setViewMode(value as ViewModeType)}
                    />
                  </div>
                }
                className={styles.transactionsCard}
              >
                {filteredPayments.length === 0 ? (
                  <Empty
                    description="No transactions found"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ) : viewMode === "card" ? (
                  <div className={styles.paymentsGrid}>
                    {filteredPayments.map(renderPaymentCard)}
                  </div>
                ) : (
                  <List
                    itemLayout="horizontal"
                    dataSource={filteredPayments}
                    renderItem={(payment: IPayment) => (
                      <List.Item
                        key={payment.id}
                        actions={[
                          <Tag
                            key={`tag-${payment.id}`}
                            color={getStatusColor(payment.status)}
                          >
                            {payment.status || "Unknown"}
                          </Tag>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<BankOutlined />} />}
                          title={formatCurrency(payment.amount)}
                          description={formatDate(payment.paymentDate)}
                        />
                        <div className={styles.listItemAmount}>
                          {formatCurrency(payment.amount)}
                        </div>
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              {renderMonthlySummary()}

              <Card title="Payment Statistics" className={styles.statsCard}>
                <Statistic
                  title="Average Transaction"
                  value={
                    filteredPayments.length
                      ? totalAmount / filteredPayments.length
                      : 0
                  }
                  precision={2}
                  prefix="R"
                  valueStyle={{ color: "#3f8600" }}
                />

                <div className={styles.statItem}>
                  <Text>Successful Transactions</Text>
                  <Progress
                    percent={
                      filteredPayments.length
                        ? (filteredPayments.filter(
                            (p) =>
                              p.status?.toLowerCase() === "completed" ||
                              p.status?.toLowerCase() === "success"
                          ).length /
                            filteredPayments.length) *
                          100
                        : 0
                    }
                    strokeColor="#52c41a"
                  />
                </div>

                <div className={styles.statItem}>
                  <Text>Pending Transactions</Text>
                  <Progress
                    percent={
                      filteredPayments.length
                        ? (filteredPayments.filter(
                            (p) => p.status?.toLowerCase() === "pending"
                          ).length /
                            filteredPayments.length) *
                          100
                        : 0
                    }
                    strokeColor="#faad14"
                  />
                </div>

                <div className={styles.statItem}>
                  <Text>Failed Transactions</Text>
                  <Progress
                    percent={
                      filteredPayments.length
                        ? (filteredPayments.filter(
                            (p) => p.status?.toLowerCase() === "failed"
                          ).length /
                            filteredPayments.length) *
                          100
                        : 0
                    }
                    strokeColor="#f5222d"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Wallet;
