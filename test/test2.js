// Import the Hardhat test helpers
const { ethers } =  require('hardhat');
const { expect } = require("chai");

// Import the smart contract to be tested
//import { GlobalSDG_Projects } from '../artifacts/contracts/GlobalSDG_Projects.sol/GlobalSDG_Projects';

// describe('GlobalSDG_Projects', () => {
//   let globalSDG_Projects;
//   let owner;
//   let user1;
//   let user2;

  // Deploy the smart contract before each test
//   beforeEach(async () => {
//     const [deployer, user1, user2] = await ethers.getSigners();

//    const globalSDG_Projects = await ethers.getContractFactory('GlobalSDG_Projects')
//       .connect(deployer)
//       .deploy('Fund My Project', ethers.utils.parseEther('10'), 10);

//     await globalSDG_Projects.deployed();
//     console.log("Deployed successfully at ", globalSDG_Projects.address);

//     console.log(deployer.address);
//     console.log(user1.address);
//     console.log(user2.address);
//   });

  // Test the contribute function
  describe('contribute', () => {

    beforeEach(async () => {
        const [deployer, user1, user2] = await ethers.getSigners();
    
       const globalSDG_Projects = await ethers.getContractFactory('GlobalSDG_Projects')
          .connect(deployer)
          .deploy('Fund My Project', ethers.utils.parseEther('10'), 10);
    
        await globalSDG_Projects.deployed();
        console.log("Deployed successfully at ", globalSDG_Projects.address);
    
        console.log(deployer.address);
        console.log(user1.address);
        console.log(user2.address);
    });

    it('Should allow contributors to contribute to the funding goal', async () => {
      await globalSDG_Projects.connect(user1).contribute({ value: ethers.utils.parseEther('2') });

      const totalFunds = await globalSDG_Projects.totalFunds();
      const contributionAmount = await globalSDG_Projects.contributions(user1);

      expect(totalFunds).to.equal(ethers.utils.parseEther('2'));
      expect(contributionAmount).to.equal(ethers.utils.parseEther('2'));
    });

    it('Should not allow contributions after the funding deadline has passed', async () => {
      await globalSDG_Projects.connect(user1).contribute({ value: ethers.utils.parseEther('2') });

      await ethers.provider.send('evm_increaseTime', [11 * 60]); // Increase time by 11 minutes

      await expect(globalSDG_Projects.connect(user2).contribute({ value: ethers.utils.parseEther('2') }))
        .to.be.revertedWith('Funding deadline has passed');
    });

    it('Should not allow contributions if the funding goal has already been reached', async () => {
      await globalSDG_Projects.connect(user1).contribute({ value: ethers.utils.parseEther('10') });

      await expect(globalSDG_Projects.connect(user2).contribute({ value: ethers.utils.parseEther('1') }))
        .to.be.revertedWith('Funding goal has already been reached');
    });
  });

  // Test the approveCompletion function
  describe('approveCompletion', () => {
    beforeEach(async () => {
        const [deployer, user1, user2] = await ethers.getSigners();
    
       const globalSDG_Projects = await ethers.getContractFactory('GlobalSDG_Projects')
          .connect(deployer)
          .deploy('Fund My Project', ethers.utils.parseEther('10'), 10);
    
        await globalSDG_Projects.deployed();
        console.log("Deployed successfully at ", globalSDG_Projects.address);
    
        console.log(deployer.address);
        console.log(user1.address);
        console.log(user2.address);
      });
      
    it('Should allow contributors to approve project completion', async () => {
      await globalSDG_Projects.connect(user1).contribute({ value: ethers.utils.parseEther('2') });

      await globalSDG_Projects.connect(user1).approveCompletion();

      const approved = await globalSDG_Projects.approval(user1);

      expect(approved).to.equal(true);
    });

    it('Should not allow non-contributors to approve project completion', async () => {
      await expect(globalSDG_Projects.connect(user1).approveCompletion())
        .to.be.revertedWith('Must be a contributor to approve project completion');
    });
  });
//});

//   // Test the checkApproval function
//   describe('checkApproval', () => {
//     it('Should return false if not all contributors have approved project completion', async () => {
//       await globalSDG_Project
