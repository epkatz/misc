/**
 * Data Refactoring
 *
 * Using our simplified version of our `SearchRequest` schema in MongoDB,
 * describe how you would refactor this into a relational database schema.
 */

const searchRequestSchema = mongooseSchema({
  createdAt: { type: Number, default: Date.now, index: true },
  updatedAt: { type: Number, default: Date.now, index: true },
  cancelledAt: { type: Number, index: true },
  activeAt: { type: Number },
  sentAt: { type: Number },
  readyAt: { type: Number },
  dueAt: { type: Number, required: true },
  blacklistedResearchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  terms: { type: String, required: true },
  description: { type: String },
  knowledge: { type: String },
  usage: { type: String },
  successIs: { type: String },
  notWanted: { type: String },
  misinterpreted: { type: String },
  comments: [{
    createdAt: { type: Number, default: Date.now },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }],
  sourcing: [{
    dueAt: { type: Number },
    inactiveAt: { type: Number },
    sourceCompensation: { type: Number },
    sources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startedAt: { type: Number, default: Date.now },
    stoppedAt: { type: Number },
    notes: { type: String },
    review: {
      startedAt: { type: Number },
      stoppedAt: { type: Number },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      passed: { type: Boolean },
      answers: {
        fullyAnswered: { type: Boolean },
        allSourcesRelevant: { type: Boolean },
        sourceNotesPointToAnswer: { type: Boolean },
        summaryOk: { type: Boolean },
        didExplainCannotFind: { type: Boolean },
        didFollowPlan: { type: Boolean },
        didExplainApproaches: { type: Boolean },
        didExplainInsights: { type: Boolean },
        didSuggestChanges: { type: Boolean },
      },
    },
  }],
});
