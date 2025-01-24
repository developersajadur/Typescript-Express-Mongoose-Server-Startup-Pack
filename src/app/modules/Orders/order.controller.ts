import { Request, Response } from 'express';
import { OrderService } from './order.service';
import OrderValidationSchema from './order.validation';
import { z } from 'zod';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    // data validation using zod
    const zodParsedData = OrderValidationSchema.parse(orderData);
    const result = await OrderService.createOrderDb(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Zod validation error handling
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
      // Handle other unexpected errors
      res.status(500).json({
        success: false,
        message: 'Failed to create order. Please try again.',
        error: error.message || 'An unexpected error occurred',
      });
    }
  }
};

// show all orders

const showAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderService.showAllOrders();
    res.status(200).json({
      success: true,
      message: 'Get Orders successfully',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders. Please try again.',
      error: error.message || 'An unexpected error occurred',
    });
  }
};

// showTotalRevenue

const showTotalRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderService.showTotalRevenue();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch total revenue. Please try again.',
      error: error.message || 'An unexpected error occurred',
    });
  }
};

export const OrderController = {
  createOrder,
  showTotalRevenue,
  showAllOrders,
};
