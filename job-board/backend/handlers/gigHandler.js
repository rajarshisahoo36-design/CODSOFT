// Business logic for gig operations will be implemented here
const GigListing = require('../blueprints/GigListing');

// 1. Creating a new job post
// Only 'scouts' (employers) should hit this endpoint
exports.createGig = async (req, res) => {
  try {
    const { title, description, location, salaryRange, listingType } = req.body;

    // Quick check to make sure they aren't sending empty strings
    if(!title || !description) {
        return res.status(400).json({ status: 'fail', message: 'Missing vital info' });
    }

    const newGig = await GigListing.create({
      title,
      description,
      location,
      salaryRange,
      listingType,
      postedBy: req.user._id // The 'protect' middleware adds this user to req
    });

    res.status(201).json({
      status: 'success',
      data: {
        gig: newGig
      }
    });

  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// 2. The Search Functionality 
exports.searchGigs = async (req, res) => {
  try {
    const { query } = req.query; // e.g. ?query=react

    if (!query) {
      // If they didn't search for anything, just give them the latest 10
      const recent = await GigListing.find().sort('-createdAt').limit(10);
      return res.status(200).json({ results: recent.length, data: recent });
    }

    // Unconventional Approach: Fetch all, then rank in memory
    const allGigs = await GigListing.find().select('+searchMetadata');
    const lowerQuery = query.toLowerCase();

    const rankedGigs = allGigs.map(gig => {
      let score = 0;
      // If the title contains the query, big points
      if (gig.title.toLowerCase().includes(lowerQuery)) score += 10;
      // If the description contains it, small points
      if (gig.searchMetadata.includes(lowerQuery)) score += 3;

      return { ...gig.toObject(), score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

    res.status(200).json({
      status: 'success',
      results: rankedGigs.length,
      data: rankedGigs
    });

  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Search blew up.' });
  }
};

// 3. Get Single Job Details (THIS WAS MISSING)
exports.getGigDetails = async (req, res) => {
  try {
    // Populate 'postedBy' so we can see who posted the job
    const gig = await GigListing.findById(req.params.id).populate('postedBy', 'username email');

    if (!gig) {
      return res.status(404).json({ status: 'fail', message: 'Job not found' });
    }

    res.status(200).json({
      status: 'success',
      data: gig
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};