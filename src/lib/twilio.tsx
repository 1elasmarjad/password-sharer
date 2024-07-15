import { env } from "~/env";
import twilio from "twilio";

const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export default twilioClient;
