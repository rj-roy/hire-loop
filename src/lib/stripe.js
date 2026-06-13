import 'server-only'
import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1ThsWsPdc3aoM1EvfnJeFSKY',
    'seeker_premium': 'price_1Tht7LPdc3aoM1Evg79fBSTm',
    'recruiter_growth': 'price_1Thu91Pdc3aoM1EvtOHR0Fhu',
    'recruiter_enterprise': 'price_1ThuAEPdc3aoM1Ev7sSeJUsl'
};