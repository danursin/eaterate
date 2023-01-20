import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
    const { method } = req;
    switch (method) {
        case "GET":
            // Get data from your database
            res.status(200).json({});
            break;
        case "PUT":
            // Update or create data in your database
            res.status(200).json({});
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
