import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

const ORDERS_COLLECTION = 'orders';

export const orderService = {
  // Create new order
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
        ...orderData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user orders
  async getUserOrders(userId) {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const orders = [];
      
      snapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Get single order
  async getOrder(orderId) {
    try {
      const docRef = doc(db, ORDERS_COLLECTION, orderId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Get all orders (admin only)
  async getAllOrders(statusFilter = null) {
    try {
      let q = collection(db, ORDERS_COLLECTION);
      
      if (statusFilter && statusFilter !== 'all') {
        q = query(q, where('status', '==', statusFilter));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      const snapshot = await getDocs(q);
      const orders = [];
      
      snapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return orders;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },

  // Update order status (admin only)
  async updateOrderStatus(orderId, status) {
    try {
      const docRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get order statistics (admin only)
  async getOrderStats() {
    try {
      const snapshot = await getDocs(collection(db, ORDERS_COLLECTION));
      
      let totalOrders = 0;
      let pendingOrders = 0;
      let totalRevenue = 0;
      
      snapshot.forEach((doc) => {
        const order = doc.data();
        totalOrders++;
        
        if (order.status === 'pending') {
          pendingOrders++;
        }
        
        if (order.status === 'delivered') {
          totalRevenue += order.total || 0;
        }
      });
      
      return {
        totalOrders,
        pendingOrders,
        totalRevenue
      };
    } catch (error) {
      console.error('Error fetching order stats:', error);
      throw error;
    }
  }
};