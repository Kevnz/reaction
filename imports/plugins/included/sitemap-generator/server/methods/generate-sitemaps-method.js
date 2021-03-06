import { Meteor } from "meteor/meteor";
import { Jobs } from "/lib/collections";
import Reaction from "/imports/plugins/core/core/server/Reaction";
import { Job } from "/imports/plugins/core/job-collection/lib";

/**
 * @name generateSitemapsMethod
 * @summary Generates & stores sitemap documents for primary shop
 * @memberof Methods/Sitemaps
 * @returns {undefined}
 */
export default function generateSitemapsMethod() {
  if (Reaction.hasAdminAccess() === false) {
    throw new Meteor.Error("access-denied", "Access Denied");
  }

  this.unblock();

  new Job(Jobs, "sitemaps/generate", {
    notifyUserId: this.userId
  }).save({ cancelRepeats: true });
}
