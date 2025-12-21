const GigListing = require('../blueprints/GigListing');
const UserPersona = require('../blueprints/UserPersona');
const sendEmail = require('../utils/emailService');
const catchAsync = require('../utils/catchAsync');

// 1. Apply for a Job
// Unique Logic: We use $addToSet to prevent duplicate applications at the database level
exports.applyToGig = catchAsync(async (req, res, next) => {
  const { gigId } = req.params;
  const candidateId = req.user._id;

  // Find the gig and push the applicant
  const gig = await GigListing.findByIdAndUpdate(
    gigId,
    {
      $addToSet: { 
        applicants: { candidateId: candidateId, status: 'pending' } 
      }
    },
    { new: true }
  ).populate('postedBy'); // We need the employer's email

  if (!gig) {
    return res.status(404).json({ status: 'fail', message: 'Job not found.' });
  }

  // OPTIONAL: Send notification to employer
  try {
    await sendEmail({
      email: gig.postedBy.email,
      subject: 'New Applicant Alert!',
      message: `Heads up! Someone just applied for ${gig.title}. Check your dashboard.`
    });
  } catch (err) {
    console.log('Email failed, but application saved. Ignoring for now.');
  }

  res.status(200).json({
    status: 'success',
    message: 'Application sent!'
  });
});

// 2. Get Employer Dashboard Data
// Unconventional Logic: Instead of 2 queries, we use MongoDB aggregation pipeline
// to get stats + lists in one go. Efficient.
exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const stats = await GigListing.aggregate([
    { $match: { postedBy: userId } }, // Filter by this employer
    {
      $facet: {
        // Pipeline 1: Get list of jobs
        "myGigs": [{ $sort: { createdAt: -1 } }],
        // Pipeline 2: Count total applicants across all jobs
        "totalApplicants": [
          { $unwind: "$applicants" },
          { $count: "count" }
        ]
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: stats[0]
  });
});