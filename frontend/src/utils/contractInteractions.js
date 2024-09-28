import { StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, makeContractCall, uintCV, stringAsciiCV, intCV } from '@stacks/transactions';

const contractAddress = 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9';
const contractName = 'enhanced-content-curation';

const network = new StacksMainnet();

export async function fetchItems() {
  const functionArgs = [uintCV(10)]; // Fetch top 10 items
  const options = {
    contractAddress,
    contractName,
    functionName: 'retrieve-top-items',
    functionArgs,
    network,
  };

  const result = await callReadOnlyFunction(options);
  return result.value.list.map(item => ({
    itemIdentifier: item.value['item-identifier'].value,
    headline: item.value.headline.value,
    hyperlink: item.value.hyperlink.value,
    topic: item.value.topic.value,
    appraisals: item.value.appraisals.value,
    gratuities: item.value.gratuities.value,
    flags: item.value.flags.value,
  }));
}

export async function submitItem(userSession, headline, hyperlink, topic) {
  const functionArgs = [
    stringAsciiCV(headline),
    stringAsciiCV(hyperlink),
    stringAsciiCV(topic)
  ];

  const options = {
    contractAddress,
    contractName,
    functionName: 'contribute-item',
    functionArgs,
    network,
    senderKey: userSession.loadUserData().appPrivateKey,
  };

  const transaction = await makeContractCall(options);
  return broadcastTransaction(transaction, network);
}

export async function voteItem(userSession, itemIdentifier, vote) {
  const functionArgs = [
    uintCV(itemIdentifier),
    intCV(vote)
  ];

  const options = {
    contractAddress,
    contractName,
    functionName: 'appraise-item',
    functionArgs,
    network,
    senderKey: userSession.loadUserData().appPrivateKey,
  };

  const transaction = await makeContractCall(options);
  return broadcastTransaction(transaction, network);
}

export async function rewardItem(userSession, itemIdentifier, amount) {
  const functionArgs = [
    uintCV(itemIdentifier),
    uintCV(amount)
  ];

  const options = {
    contractAddress,
    contractName,
    functionName: 'reward-originator',
    functionArgs,
    network,
    senderKey: userSession.loadUserData().appPrivateKey,
  };

  const transaction = await makeContractCall(options);
  return broadcastTransaction(transaction, network);
}

export async function flagItem(userSession, itemIdentifier) {
  const functionArgs = [uintCV(itemIdentifier)];

  const options = {
    contractAddress,
    contractName,
    functionName: 'flag-item',
    functionArgs,
    network,
    senderKey: userSession.loadUserData().appPrivateKey,
  };

  const transaction = await makeContractCall(options);
  return broadcastTransaction(transaction, network);
}

export async function adjustSubmissionCharge(userSession, newCharge) {
  const functionArgs = [uintCV(newCharge)];

  const options = {
    contractAddress,
    contractName,
    functionName: 'adjust-submission-charge',
    functionArgs,
    network,
    senderKey: userSession.loadUserData().appPrivateKey,
  };

  const transaction = await makeContractCall(options);
  return broadcastTransaction(transaction, network);
}

export async function introduceTopic(userSession, newTopic) {
  const functionArgs = [stringAsciiCV(newTopic)];

  const options = {
    contractAddress,
    contractName,
    functionName: 'introduce-topic',
    functionArgs,
    network,
    senderKey: userSession.loadUserData().appPrivateKey,
  };

  const transaction = await makeContractCall(options);
  return broadcastTransaction(transaction, network);
}

export async function expungeItem(userSession, itemIdentifier) {
  const functionArgs = [uintCV(itemIdentifier)];

  const options = {
    contractAddress,
    contractName,
    functionName: 'expunge-item',
    functionArgs,
    network,
    senderKey: userSession.loadUserData().appPrivateKey,
  };

  const transaction = await makeContractCall(options);
  return broadcastTransaction(transaction, network);
}

async function broadcastTransaction(transaction, network) {
  const broadcastResult = await network.broadcastTransaction(transaction);
  const txId = broadcastResult.txid;
  return waitForTransaction(txId, network);
}

async function waitForTransaction(txId, network) {
  const maxAttempts = 30;
  const delayMs = 10000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const tx = await network.getTransaction(txId);
    if (tx && tx.tx_status === 'success') {
      return tx;
    }
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  throw new Error(`Transaction ${txId} not confirmed after ${maxAttempts} attempts`);
}
