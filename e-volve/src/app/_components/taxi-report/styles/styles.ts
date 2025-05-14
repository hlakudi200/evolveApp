// components/ai/styles.ts

export const styles = {
    container: {
      marginTop: '20px',
      marginBottom: '24px',
    },
    cardBody: {
      padding: '16px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
      marginBottom: '16px',
    },
    select: {
      width: '100%',
      marginBottom: '16px',
    },
    textArea: {
      marginBottom: '16px',
    },
    generateButton: {
      width: '100%',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '16px',
    },
    reportContainer: {
      marginTop: '24px',
      // Ensure container doesn't affect global layout
      position: 'relative' as const,
    },
    reportHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    reportContent: {
      backgroundColor: '#f9f9f9',
      padding: '16px',
      border: '1px solid #e8e8e8',
      borderRadius: '4px',
      // Contain the overflow within this element only
      position: 'relative' as const,
    },
    reportText: {
      // Changed from pre-wrap to normal to allow proper formatting
      whiteSpace: 'normal' as const,
      maxHeight: '170px',
      overflowY: 'auto' as const,
      padding: '16px',
      // Ensure text doesn't overflow horizontally
      overflowX: 'hidden' as const,
      wordBreak: 'break-word' as const,
    },
    formattedText: {
      lineHeight: '1.6',
      fontSize: '14px',
    },
    heading1: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginTop: '16px',
      marginBottom: '8px',
    },
    heading2: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '14px',
      marginBottom: '6px',
    },
    heading3: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '12px',
      marginBottom: '6px',
    },
    paragraph: {
      marginBottom: '12px',
    },
    listItem: {
      marginLeft: '20px',
      marginBottom: '4px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '8px',
    },
  };
  
  export default styles;