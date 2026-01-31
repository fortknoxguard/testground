// /api/login.js - Vercel serverless function
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // TODO: Replace with your actual authentication logic
        // Example: validate against database or auth service
        if (email && password.length >= 6) {
            return res.status(200).json({ 
                message: 'Login successful',
                token: 'your-jwt-token-here'
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
}
