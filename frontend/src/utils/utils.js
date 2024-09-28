import { openContractCall } from '@stacks/connect';

export const handleContractCall = async (functionName, functionArgs, userSession) => {
  const options = {
    contractAddress: 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
    contractName: 'enhanced-content-curation',
    functionName,
    functionArgs,
    network: new StacksMainnet(),
    appDetails: {
      name: 'Enhanced Content Curation',
      icon: '/logo.png',
    },
    onFinish: data => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

export const showNotification = (message, type = 'info') => {
  // This function can be implemented using a notification library of your choice
  // For simplicity, we'll just log to the console
  console.log(`[${type.toUpperCase()}] ${message}`);
};
