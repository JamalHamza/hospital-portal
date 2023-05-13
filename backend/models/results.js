const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'doctor',
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    filename: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ! --------------------------------

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
