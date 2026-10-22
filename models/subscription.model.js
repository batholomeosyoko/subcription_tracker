import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: [2, "Subscription name must be at least 2 characters long"],
      maxLength: [30, "Subscription name must be at most 30 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v);
        },
        message: "Subscription price must be a number",
      },
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JPY", "KES", "TZS"],
      default: "TZS",
      required: [true, "Subscription currency is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[A-Z]{3}$/.test(v);
        },
        message: "Subscription currency must be a 3-letter code",
      },
    },
    billingCycle: {
      type: String,
      required: [true, "Subscription billing cycle is required"],
      trim: true,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    nextBillingDate: {
      type: Date,
      required: [true, "Subscription next billing date is required"],
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: [true, "Subscription payment method is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
      trim: true,
      enum: [
        "entertainment",
        "education",
        "productivity",
        "finance",
        "gaming",
        "other",
      ],
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value) => value <= this.endDate,
        message: "Subscription start date must be before the end date",
      },
      trim: true,
    },

    renewalDate: {
      type: Date,
      required: [true, "Subscription renewal date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Subscription renewal date must be after the start date",
      },
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
  },
  { timestamps: true }
);

SubscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
      const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
      };
      this.renewalDate = new Date(this.startDate);
      this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.billingCycle]);
    }
    if (this.renewalDate < new Date()) {
      this.status = 'expired';
    } 
    next();

  }
);

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;
