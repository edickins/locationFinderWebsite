const Location = require('../models/Location');

async function getNextLocationId() {
  try {
    const locations = await Location.find({}, 'id');

    const ids = locations.map(location => {
      const id = location.id.slice(8);
      return parseInt(id);
    });

    const maxID = Math.max(...ids);
    const nextID = maxID + 1;
    return `location${nextID.toString().padStart(3, '0')}`;
  } catch (error) {
    console.error(error);
    return error;
  }
}
module.exports = getNextLocationId;
