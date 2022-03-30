/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FutNFT, FutNFTInterface } from "../FutNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "playerId",
        type: "uint256",
      },
    ],
    name: "PlayerAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListedPlayers",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "preferredPosition",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "level",
            type: "uint8",
          },
          {
            internalType: "uint64",
            name: "lastUpgrade",
            type: "uint64",
          },
          {
            internalType: "string[]",
            name: "suitablePositions",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
        ],
        internalType: "struct FutNFT.Player",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getPlayerExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "getPlayersByOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lineUps",
    outputs: [
      {
        internalType: "string",
        name: "formation",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isValid",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listedPlayers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listedPlayersPrices",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "preferredPosition",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "level",
            type: "uint8",
          },
          {
            internalType: "uint64",
            name: "lastUpgrade",
            type: "uint64",
          },
          {
            internalType: "string[]",
            name: "suitablePositions",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
        ],
        internalType: "struct FutNFT.Player",
        name: "_player",
        type: "tuple",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playerToOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_size",
        type: "uint256",
      },
    ],
    name: "setDefaultArraySize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260646013553480156200001657600080fd5b506040805180820182526006815265119d5d13919560d21b6020808301918252835180850190945260048452631193919560e21b9084015281519192916200006191600091620000f0565b50805162000077906001906020840190620000f0565b505050620000946200008e6200009a60201b60201c565b6200009e565b620001d3565b3390565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620000fe9062000196565b90600052602060002090601f0160209004810192826200012257600085556200016d565b82601f106200013d57805160ff19168380011785556200016d565b828001600101855582156200016d579182015b828111156200016d57825182559160200191906001019062000150565b506200017b9291506200017f565b5090565b5b808211156200017b576000815560010162000180565b600181811c90821680620001ab57607f821691505b60208210811415620001cd57634e487b7160e01b600052602260045260246000fd5b50919050565b6129b580620001e36000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c8063643322851161010f578063b88d4fde116100a2578063eef2fc1f11610071578063eef2fc1f1461046f578063f2eeb53614610482578063f2fde38b14610495578063fd32f918146104a857600080fd5b8063b88d4fde146103ed578063c87b56dd14610400578063e55ae4e814610413578063e985e9c51461043357600080fd5b8063923e5c6a116100de578063923e5c6a146103ac57806395d89b41146103bf578063a22cb465146103c7578063b1bcaec2146103da57600080fd5b8063643322851461036057806370a0823114610380578063715018a6146103935780638da5cb5b1461039b57600080fd5b806319b90d271161018757806342842e0e1161015657806342842e0e146102fc5780634f6ccce71461030f578063580adaa3146103225780636352211e1461034d57600080fd5b806319b90d271461029a57806323b872dd146102c35780632e1a7d4d146102d65780632f745c59146102e957600080fd5b8063081812fc116101c3578063081812fc1461023c578063095ea7b31461026757806312065fe01461027c57806318160ddd1461029257600080fd5b806301ffc9a7146101ea57806305901e891461021257806306fdde0314610227575b600080fd5b6101fd6101f83660046120b5565b6104c9565b60405190151581526020015b60405180910390f35b61021a6104da565b60405161020991906120d2565b61022f610532565b604051610209919061216e565b61024f61024a366004612181565b6105bb565b6040516001600160a01b039091168152602001610209565b61027a6102753660046121b6565b610655565b005b61028461076b565b604051908152602001610209565b600854610284565b61024f6102a8366004612181565b600d602052600090815260409020546001600160a01b031681565b61027a6102d13660046121e0565b61079d565b61027a6102e4366004612181565b6107ce565b6102846102f73660046121b6565b610900565b61027a61030a3660046121e0565b610996565b61028461031d366004612181565b6109b1565b6101fd610330366004612181565b6000908152600d60205260409020546001600160a01b0316151590565b61024f61035b366004612181565b610a44565b61028461036e366004612181565b600f6020526000908152604090205481565b61028461038e36600461221c565b610a4f565b61027a610ad6565b600a546001600160a01b031661024f565b6102846103ba366004612181565b610b0c565b61022f610b2d565b61027a6103d5366004612237565b610b3c565b61027a6103e8366004612181565b610b47565b61027a6103fb366004612339565b610b76565b61022f61040e366004612181565b610bae565b610426610421366004612181565b610c96565b6040516102099190612409565b6101fd6104413660046124d0565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61021a61047d36600461221c565b610fdf565b61027a6104903660046125e9565b611123565b61027a6104a336600461221c565b61132a565b6104bb6104b636600461221c565b6113c5565b6040516102099291906126ff565b60006104d48261146e565b92915050565b6060601180548060200260200160405190810160405280929190818152602001828054801561052857602002820191906000526020600020905b815481526020019060010190808311610514575b5050505050905090565b60606000805461054190612723565b80601f016020809104026020016040519081016040528092919081815260200182805461056d90612723565b80156105285780601f1061058f57610100808354040283529160200191610528565b820191906000526020600020905b81548152906001019060200180831161059d57509395945050505050565b6000818152600260205260408120546001600160a01b03166106395760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061066082611493565b9050806001600160a01b0316836001600160a01b031614156106ce5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610630565b336001600160a01b03821614806106ea57506106ea8133610441565b61075c5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610630565b610766838361150a565b505050565b600a546000906001600160a01b031633146107985760405162461bcd60e51b81526004016106309061275e565b504790565b6107a73382611578565b6107c35760405162461bcd60e51b815260040161063090612793565b61076683838361166f565b600a546001600160a01b031633146107f85760405162461bcd60e51b81526004016106309061275e565b8047116108525760405162461bcd60e51b815260206004820152602260248201527f5468652070726963652069732067726561746572207468616e2062616c616e63604482015261652160f01b6064820152608401610630565b604051600090339083908381818185875af1925050503d8060008114610894576040519150601f19603f3d011682016040523d82523d6000602084013e610899565b606091505b50509050806108fc5760405162461bcd60e51b815260206004820152602960248201527f5472616e73616374696f6e206661696c65642c20636f756c64206e6f742073656044820152686e642066756e64732160b81b6064820152608401610630565b5050565b600061090b83610a4f565b821061096d5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610630565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61076683838360405180602001604052806000815250610b76565b60006109bc60085490565b8210610a1f5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610630565b60088281548110610a3257610a326127e4565b90600052602060002001549050919050565b60006104d482611493565b60006001600160a01b038216610aba5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610630565b506001600160a01b031660009081526003602052604090205490565b600a546001600160a01b03163314610b005760405162461bcd60e51b81526004016106309061275e565b610b0a6000611816565b565b60118181548110610b1c57600080fd5b600091825260209091200154905081565b60606001805461054190612723565b6108fc338383611868565b600a546001600160a01b03163314610b715760405162461bcd60e51b81526004016106309061275e565b601355565b610b803383611578565b610b9c5760405162461bcd60e51b815260040161063090612793565b610ba884848484611937565b50505050565b6000818152600260205260409020546060906001600160a01b0316610c2d5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610630565b6000610c4460408051602081019091526000815290565b90506000815111610c645760405180602001604052806000815250610c8f565b80610c6e8461196a565b604051602001610c7f9291906127fa565b6040516020818303038152906040525b9392505050565b610ced604051806101000160405280606081526020016060815260200160008152602001600060ff168152602001600060ff16815260200160006001600160401b0316815260200160608152602001606081525090565b6000828152600c60205260409081902081516101008101909252805482908290610d1690612723565b80601f0160208091040260200160405190810160405280929190818152602001828054610d4290612723565b8015610d8f5780601f10610d6457610100808354040283529160200191610d8f565b820191906000526020600020905b815481529060010190602001808311610d7257829003601f168201915b50505050508152602001600182018054610da890612723565b80601f0160208091040260200160405190810160405280929190818152602001828054610dd490612723565b8015610e215780601f10610df657610100808354040283529160200191610e21565b820191906000526020600020905b815481529060010190602001808311610e0457829003601f168201915b50505091835250506002820154602080830191909152600383015460ff80821660408086019190915261010083049091166060850152620100009091046001600160401b0316608084015260048401805482518185028101850190935280835260a090940193919290919060009084015b82821015610f3e578382906000526020600020018054610eb190612723565b80601f0160208091040260200160405190810160405280929190818152602001828054610edd90612723565b8015610f2a5780601f10610eff57610100808354040283529160200191610f2a565b820191906000526020600020905b815481529060010190602001808311610f0d57829003601f168201915b505050505081526020019060010190610e92565b505050508152602001600582018054610f5690612723565b80601f0160208091040260200160405190810160405280929190818152602001828054610f8290612723565b8015610fcf5780601f10610fa457610100808354040283529160200191610fcf565b820191906000526020600020905b815481529060010190602001808311610fb257829003601f168201915b5050505050815250509050919050565b606060006013546001600160401b03811115610ffd57610ffd612273565b604051908082528060200260200182016040528015611026578160200160208202803683370190505b5090506000805b60125481101561111a57846001600160a01b0316600d600060128481548110611058576110586127e4565b600091825260208083209091015483528201929092526040019020546001600160a01b03161480156110ba5750600e60006012838154811061109c5761109c6127e4565b90600052602060002001548152602001908152602001600020546000145b1561110857601281815481106110d2576110d26127e4565b90600052602060002001548383815181106110ef576110ef6127e4565b6020908102919091010152816111048161283f565b9250505b806111128161283f565b91505061102d565b50909392505050565b600a546001600160a01b0316331461114d5760405162461bcd60e51b81526004016106309061275e565b6040808201516000908152600d60205220546001600160a01b0316156111a65760405162461bcd60e51b815260206004820152600e60248201526d506c61796572204578697374732160901b6044820152606401610630565b6040808201516000908152600c60209081529190208251805184936111cf928492910190611f56565b5060208281015180516111e89260018501920190611f56565b50604082015160028201556060820151600382018054608085015160a08601516001600160401b0316620100000269ffffffffffffffff00001960ff9283166101000261ffff199094169290951691909117919091179290921691909117905560c08201518051611263916004840191602090910190611fda565b5060e0820151805161127f916005840191602090910190611f56565b505050604080820180516012805460018101825560009182527fbb8a6a4669ba250d26cd7a459eca9d215f8307e33aebe50379bc5a3617ec3444019190915581518152600d6020529190912080546001600160a01b0319163390811790915590516112ea9190611a67565b7f5af403e238a3f8f7d43c05ff2fac53c833e031e8fb8ec011b3c8e073d870ad7b816040015160405161131f91815260200190565b60405180910390a150565b600a546001600160a01b031633146113545760405162461bcd60e51b81526004016106309061275e565b6001600160a01b0381166113b95760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610630565b6113c281611816565b50565b60106020526000908152604090206016810180546113e290612723565b80601f016020809104026020016040519081016040528092919081815260200182805461140e90612723565b801561145b5780601f106114305761010080835404028352916020019161145b565b820191906000526020600020905b81548152906001019060200180831161143e57829003601f168201915b5050506017909301549192505060ff1682565b60006001600160e01b0319821663780e9d6360e01b14806104d457506104d482611bb5565b6000818152600260205260408120546001600160a01b0316806104d45760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610630565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061153f82611493565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166115f15760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610630565b60006115fc83611493565b9050806001600160a01b0316846001600160a01b031614806116375750836001600160a01b031661162c846105bb565b6001600160a01b0316145b8061166757506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661168282611493565b6001600160a01b0316146116e65760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610630565b6001600160a01b0382166117485760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610630565b611753838383611c05565b61175e60008261150a565b6001600160a01b038316600090815260036020526040812080546001929061178790849061285a565b90915550506001600160a01b03821660009081526003602052604081208054600192906117b5908490612871565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b031614156118ca5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610630565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61194284848461166f565b61194e84848484611c10565b610ba85760405162461bcd60e51b815260040161063090612889565b60608161198e5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156119b857806119a28161283f565b91506119b19050600a836128f1565b9150611992565b6000816001600160401b038111156119d2576119d2612273565b6040519080825280601f01601f1916602001820160405280156119fc576020820181803683370190505b5090505b841561166757611a1160018361285a565b9150611a1e600a86612905565b611a29906030612871565b60f81b818381518110611a3e57611a3e6127e4565b60200101906001600160f81b031916908160001a905350611a60600a866128f1565b9450611a00565b6001600160a01b038216611abd5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610630565b6000818152600260205260409020546001600160a01b031615611b225760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610630565b611b2e60008383611c05565b6001600160a01b0382166000908152600360205260408120805460019290611b57908490612871565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006001600160e01b031982166380ac58cd60e01b1480611be657506001600160e01b03198216635b5e139f60e01b145b806104d457506301ffc9a760e01b6001600160e01b03198316146104d4565b610766838383611d0e565b60006001600160a01b0384163b15611d0357604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611c54903390899088908890600401612919565b6020604051808303816000875af1925050508015611c8f575060408051601f3d908101601f19168201909252611c8c9181019061294c565b60015b611ce9573d808015611cbd576040519150601f19603f3d011682016040523d82523d6000602084013e611cc2565b606091505b508051611ce15760405162461bcd60e51b815260040161063090612889565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611667565b506001949350505050565b6001600160a01b038316611d6957611d6481600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611d8c565b816001600160a01b0316836001600160a01b031614611d8c57611d8c8382611dc6565b6001600160a01b038216611da35761076681611e63565b826001600160a01b0316826001600160a01b031614610766576107668282611f12565b60006001611dd384610a4f565b611ddd919061285a565b600083815260076020526040902054909150808214611e30576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b600854600090611e759060019061285a565b60008381526009602052604081205460088054939450909284908110611e9d57611e9d6127e4565b906000526020600020015490508060088381548110611ebe57611ebe6127e4565b6000918252602080832090910192909255828152600990915260408082208490558582528120556008805480611ef657611ef6612969565b6001900381819060005260206000200160009055905550505050565b6000611f1d83610a4f565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b828054611f6290612723565b90600052602060002090601f016020900481019282611f845760008555611fca565b82601f10611f9d57805160ff1916838001178555611fca565b82800160010185558215611fca579182015b82811115611fca578251825591602001919060010190611faf565b50611fd6929150612033565b5090565b828054828255906000526020600020908101928215612027579160200282015b828111156120275782518051612017918491602090910190611f56565b5091602001919060010190611ffa565b50611fd6929150612048565b5b80821115611fd65760008155600101612034565b80821115611fd657600061205c8282612065565b50600101612048565b50805461207190612723565b6000825580601f10612081575050565b601f0160209004906000526020600020908101906113c29190612033565b6001600160e01b0319811681146113c257600080fd5b6000602082840312156120c757600080fd5b8135610c8f8161209f565b6020808252825182820181905260009190848201906040850190845b8181101561210a578351835292840192918401916001016120ee565b50909695505050505050565b60005b83811015612131578181015183820152602001612119565b83811115610ba85750506000910152565b6000815180845261215a816020860160208601612116565b601f01601f19169290920160200192915050565b602081526000610c8f6020830184612142565b60006020828403121561219357600080fd5b5035919050565b80356001600160a01b03811681146121b157600080fd5b919050565b600080604083850312156121c957600080fd5b6121d28361219a565b946020939093013593505050565b6000806000606084860312156121f557600080fd5b6121fe8461219a565b925061220c6020850161219a565b9150604084013590509250925092565b60006020828403121561222e57600080fd5b610c8f8261219a565b6000806040838503121561224a57600080fd5b6122538361219a565b91506020830135801515811461226857600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60405161010081016001600160401b03811182821017156122ac576122ac612273565b60405290565b604051601f8201601f191681016001600160401b03811182821017156122da576122da612273565b604052919050565b60006001600160401b038311156122fb576122fb612273565b61230e601f8401601f19166020016122b2565b905082815283838301111561232257600080fd5b828260208301376000602084830101529392505050565b6000806000806080858703121561234f57600080fd5b6123588561219a565b93506123666020860161219a565b92506040850135915060608501356001600160401b0381111561238857600080fd5b8501601f8101871361239957600080fd5b6123a8878235602084016122e2565b91505092959194509250565b600081518084526020808501808196508360051b8101915082860160005b858110156123fc5782840389526123ea848351612142565b988501989350908401906001016123d2565b5091979650505050505050565b6020815260008251610100806020850152612428610120850183612142565b91506020850151601f19808685030160408701526124468483612142565b93506040870151606087015260608701519150612468608087018360ff169052565b608087015160ff811660a0880152915060a08701516001600160401b03811660c0880152915060c08701519150808685030160e08701526124a984836123b4565b935060e08701519150808685030183870152506124c68382612142565b9695505050505050565b600080604083850312156124e357600080fd5b6124ec8361219a565b91506124fa6020840161219a565b90509250929050565b600082601f83011261251457600080fd5b610c8f838335602085016122e2565b803560ff811681146121b157600080fd5b80356001600160401b03811681146121b157600080fd5b600082601f83011261255c57600080fd5b813560206001600160401b038083111561257857612578612273565b8260051b6125878382016122b2565b93845285810183019383810190888611156125a157600080fd5b84880192505b858310156125dd578235848111156125bf5760008081fd5b6125cd8a87838c0101612503565b83525091840191908401906125a7565b98975050505050505050565b6000602082840312156125fb57600080fd5b81356001600160401b038082111561261257600080fd5b90830190610100828603121561262757600080fd5b61262f612289565b82358281111561263e57600080fd5b61264a87828601612503565b82525060208301358281111561265f57600080fd5b61266b87828601612503565b6020830152506040830135604082015261268760608401612523565b606082015261269860808401612523565b60808201526126a960a08401612534565b60a082015260c0830135828111156126c057600080fd5b6126cc8782860161254b565b60c08301525060e0830135828111156126e457600080fd5b6126f087828601612503565b60e08301525095945050505050565b6040815260006127126040830185612142565b905082151560208301529392505050565b600181811c9082168061273757607f821691505b6020821081141561275857634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b6000835161280c818460208801612116565b835190830190612820818360208801612116565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b600060001982141561285357612853612829565b5060010190565b60008282101561286c5761286c612829565b500390565b6000821982111561288457612884612829565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b634e487b7160e01b600052601260045260246000fd5b600082612900576129006128db565b500490565b600082612914576129146128db565b500690565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906124c690830184612142565b60006020828403121561295e57600080fd5b8151610c8f8161209f565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220d91a23ce01e99747837d6641b29907311ec3c935c64228c86c5da95f544e2af264736f6c634300080c0033";

type FutNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FutNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FutNFT__factory extends ContractFactory {
  constructor(...args: FutNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "FutNFT";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FutNFT> {
    return super.deploy(overrides || {}) as Promise<FutNFT>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): FutNFT {
    return super.attach(address) as FutNFT;
  }
  connect(signer: Signer): FutNFT__factory {
    return super.connect(signer) as FutNFT__factory;
  }
  static readonly contractName: "FutNFT";
  public readonly contractName: "FutNFT";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FutNFTInterface {
    return new utils.Interface(_abi) as FutNFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): FutNFT {
    return new Contract(address, _abi, signerOrProvider) as FutNFT;
  }
}
