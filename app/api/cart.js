import connectToDb from '../../utils/connectToDb';
import Cart from '../../models/Cart';
import { NextApiRequest, NextApiResponse } from 'next';

await connectToDb(); // Ensure connection to MongoDB

// GET /api/cart (Retrieve Cart)
export async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product data if needed

    if (!cart) {
      return res.status(200).json({ items: [] }); // Return empty cart if not found
    }
    return res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ message: 'Error retrieving cart' });
  }
}

// POST /api/cart (Add Item)
export async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, productId } = req.body;

  try {
    // Check for existing user cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const existingItem = cart.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    return res.status(201).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
