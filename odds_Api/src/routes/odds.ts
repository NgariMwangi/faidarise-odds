import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
const router = Router();
// Construct the path to odds.json located in the parent directory
const oddsFilePath = path.resolve(__dirname, '..', '..','..', 'scrapper', 'output.json');

// GET /odds - return all odds
router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile(oddsFilePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ message: 'Error reading data', error: err });
  }
});

// GET /odds/:sport - return filtered by sport
router.get('/:sport', async (req, res) => {
  const sport = req.params.sport.toLowerCase();

  try {
    const data = await fs.readFile(oddsFilePath, 'utf-8');
    const allOdds = JSON.parse(data);
    const filtered = allOdds.filter(
        (item: any) => typeof item.sport_type === 'string' && item.sport_type.toLowerCase() === sport.toLowerCase()
      );
      
    console.log(filtered)
    if (filtered.length === 0) {
      return res.status(404).json({ message: `No odds found for ${sport}` });
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Error reading data', error: err });
  }
});

export default router;
