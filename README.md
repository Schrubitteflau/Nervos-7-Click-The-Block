# Click The Block

Created for `Nervos Hackaton`, task 7 : https://gitcoin.co/issue/nervosnetwork/grants/8/100026214

Based on : https://github.com/Kuzirashi/blockchain-workshop/tree/godwoken-simple

A simple web page to store and retrieve values from a smart contract deployed on `Nervos Testnet Layer 2`.

Deployed contract address: 0x340aD995E6d73a33003041146a85B4D3d9F622fa

Deploy transaction hash: 0x9e4a97269a6891729ccf16346d16d56fd77eb9399bb2e049dcf602a7dea6fc4e

Useful documentation : https://docs.nervos.org/docs/essays/rules#script

# Start UI

```
yarn && yarn build && yarn ui
```

# Demo

## UI presentation

![UI presentation](images/1_ui_presentation.png)

## Play the click game

![Click game](images/2_click_game.png)

## The game has ended, let's submit my score !

![Click game ended](images/3_click_game_end.png)

![Submit score](images/4_submit_score.png)

## The scoreboard is now updated with my last score

![Scoreboard updated](images/5_scoreboard_updated.png)

## Let's change my username from 'abcdef' to 'Nervos'

![Update username](images/6_update_username.png)

## The scoreboard is now updated with my new username

![Scoreboard updated](images/7_scoreboard_updated.png)

# Smart contract : Scores.sol

```sol
pragma solidity >=0.8.0;

contract Scores {

  Score[] public scores;
  
  // Usernames per address
  mapping(address => string) public usernames;

  // Each Score is represented by an user, the score and a timestamp
  struct Score {
    address user;
    uint score;
    uint time;
  }
  
  // Used as return type of getLatestScores()
  struct ScoreWithUsername {
    address user;
    uint score;
    uint time;
    string username;
  }
  
  // Add a score
  function addScore(uint _score) public {
      require(_score > 0, "Score must be > 0");
      
      Score memory score = Score({
          user: msg.sender,
          score: _score,
          time: block.timestamp
      });
      scores.push(score);
  }
  
  // Attach a username to an address
  function setUsername(string memory _username) public {
      require(bytes(_username).length >= 3 && bytes(_username).length <= 10, "Username must be between 3 and 10 characters");

      usernames[msg.sender] = _username;
  }
  
  // Get the number of stored scores
  function scoresCount() external view returns(uint) {
      return scores.length;
  }
  
  // Get the _count latest scores
  function getLatestScores(uint _count) public view returns (ScoreWithUsername[] memory) {
      require(_count > 0, "Count must be > 0");

      uint scoresLength = scores.length;
      // _count max value is scoresLength
      uint count = (_count > scoresLength ? scoresLength : _count);
      // Return array
      ScoreWithUsername[] memory latestScores = new ScoreWithUsername[](count);
      
      for (uint i = 0; i < count; i++)
      {
          // Pointer to the stored score
          Score storage score = scores[scoresLength - i - 1];
          // Username (optional) of the user
          string memory username = usernames[score.user];
          // New struct with username
          ScoreWithUsername memory scoreWithUsername = ScoreWithUsername({
              user: score.user,
              score: score.score,
              time: score.time,
              username: username
          });
          // Append it to the return array
          latestScores[i] = scoreWithUsername;
      }
      
      return latestScores;
  }
}
```

ABI :
```json
[
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "scores",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "usernames",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_score",
                "type": "uint256"
            }
        ],
        "name": "addScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_username",
                "type": "string"
            }
        ],
        "name": "setUsername",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "scoresCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_count",
                "type": "uint256"
            }
        ],
        "name": "getLatestScores",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "score",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    }
                ],
                "internalType": "struct Scores.ScoreWithUsername[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
```
