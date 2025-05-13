'use client';

import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    overflowY:'scroll',
    height:'85vh'
  },
  header: {
    marginBottom: '24px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
    gap: '16px',
  },
  loadingText: {
    fontSize: '16px',
    color: '#8c8c8c',
  },
  errorAlert: {
    margin: '24px',
  },
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  },
  routesCard: {
    height: '100%',
    boxShadow: '0 2px 8px rgba(191, 201, 135, 0.19)',
    borderRadius: '8px',
  },
  detailsCard: {
    height: '100%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
    borderRadius: '8px',
  },
  placeholderCard: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
    borderRadius: '8px',
    minHeight: '400px',
  },
  routeItem: {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '12px',
    border: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'all 0.3s',
    position: 'relative',
  },
  selectedRouteItem: {
    borderColor: '#000000',
    backgroundColor: '#f5f5f5',
  },
  routeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  routeName: {
    fontSize: '16px',
  },
  queueBadge: {
    backgroundColor: '#000000',
  },
  routeDetails: {
    marginTop: '8px',
  },
  routeSelect: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
  },
  selectedIcon: {
    color: '#000000',
    fontSize: '20px',
  },
  innerCard: {
    marginBottom: '16px',
  },
  locationPin: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  originIcon: {
    color: '#000000',
    fontSize: '18px',
  },
  destinationIcon: {
    color: '#52c41a',
    fontSize: '18px',
  },
  fareInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tabs: {
    marginTop: '16px',
  },
  queueCard: {
    marginBottom: '16px',
    borderRadius: '8px',
  },
  queueHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  taxiItem: {
    padding: 0,
    marginBottom: '12px',
  },
  taxiCard: {
    padding: '12px',
    boxShadow: 'none',
  },
  taxiIcon: {
    fontSize: '18px',
    color: '#000000',
    marginRight: '8px',
  },
  bookButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  bookButton: {
    borderRadius: '4px',
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  mapPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    gap: '16px',
  },
  mapIcon: {
    fontSize: '48px',
    color: '#000000',
  },
};