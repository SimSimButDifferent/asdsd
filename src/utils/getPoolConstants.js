const { ethers } = require("hardhat")
const { FeeAmount } = require("@uniswap/v3-sdk")
const { getProvider } = require("./getProvider")

const IUniswapV3FactoryABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json")

const {
    POOL_FACTORY_CONTRACT_ADDRESS,
    USDC_TOKEN,
    WETH_TOKEN,
} = require("../utils/constants")

const feeLow = FeeAmount.LOW
const feeMed = FeeAmount.MEDIUM
const feeHigh = FeeAmount.HIGH

/**
 * @dev Get the pool constants for the given token addresses and fee
 * @param _token0
 * @param _token1
 * @param _fee
 * @returns current pool address
 */
async function getPoolConstants(_token0, _token1, _fee) {
    // Create a new provider
    const provider = getProvider()

    // Create a new instance of the PoolFactory contract
    const poolFactory = new ethers.Contract(
        POOL_FACTORY_CONTRACT_ADDRESS,
        IUniswapV3FactoryABI.abi,
        provider,
    )

    // Get the current pool address
    const currentPoolAddress = await poolFactory.getPool(
        _token0.address,
        _token1.address,
        _fee,
    )

    console.log(currentPoolAddress)

    return currentPoolAddress
}

getPoolConstants(USDC_TOKEN, WETH_TOKEN, feeMed).catch((error) => {
    console.error("Error in getPoolConstants:", error)
    process.exitCode = 1
})

exports.getPoolConstants = getPoolConstants