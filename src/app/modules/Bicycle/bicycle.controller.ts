import { Request, Response } from 'express';
import { BicycleService } from './bicycle.service';
import BicycleValidationSchema from './bicycle.validation';
import { z } from 'zod';

// create product
const createBicycle = async (req: Request, res: Response) => {
  try {
    const BicycleData = await req.body;
    // data validation using zod
    const zodParsedData = BicycleValidationSchema.parse(BicycleData);

    const result = await BicycleService.createBicycleDb(zodParsedData);

    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: error.name,
          errors: error.errors.reduce((acc: any, err: any) => {
            acc[err.path[0]] = {
              message: err.message,
              name: 'ValidatorError',
              properties: {
                message: err.message,
              },
              path: err.path,
              value: err.input,
            };
            return acc;
          }, {}),
        },
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: error.message,
      });
    }
  }
};

// find  product
const findAllBiCycle = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;

    let filter = {};

    if (searchTerm) {
      // Search bicycles based on searchTerm
      filter = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { type: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }

    // Get bicycles either based on the filter or all
    const bicycles = await BicycleService.getAllBiCycle(filter);

    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: bicycles,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to find bicycles. Please try again.',
      error: error.message || 'An unexpected error occurred',
    });
    res.status(404).json({
      success: false,
      message: 'An unknown error occurred.',
    });
  }
};

// get a single bicycle

const findBiCycleById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await BicycleService.getSingleBiCycleById(productId);
    res.status(200).json({
      success: true,
      message: 'Bicycle retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to find bicycle. Please try again.',
      error: error.message || 'An unexpected error occurred',
    });
  }
};

// update a bicycle

const updateBiCycleById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;
    const result = await BicycleService.updateBiCycleById(
      productId,
      updatedData,
    );
    res.status(200).json({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update bicycle. Please try again.',
      error: error.message || 'An unexpected error occurred',
    });
  }
};

// delete a bicycle

const deleteBiCycleById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await BicycleService.deleteBiCycleById(productId);
    res.status(200).json({
      success: true,
      message: 'Bicycle deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete bicycle. Please try again.',
      error: error.message || 'An unexpected error occurred',
    });
  }
};

export const BicycleController = {
  createBicycle,
  findAllBiCycle,
  findBiCycleById,
  updateBiCycleById,
  deleteBiCycleById,
};
