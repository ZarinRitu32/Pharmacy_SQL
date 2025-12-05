const {
  getEmployeeDetails,
  updateEmployeeUsername,
  updateEmployeeContact,
  updateEmployeeAddress,
} = require("../../db/Users");

// Retrieve employee details
const retrieveEmployeeDetails = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.user) {
      return res.redirect("/login");
    }

    const employeeDetails = await getEmployeeDetails(req.user.username);

    // If no employee found, show friendly message
    if (!employeeDetails || employeeDetails.length === 0) {
      return res.render("Home/index.ejs", {
        user: req.user,
        userDetails: [],
        message: "No employee details found.",
      });
    }

    res.render("Home/index.ejs", {
      user: req.user,
      userDetails: employeeDetails,
      message: null,
    });
  } catch (error) {
    console.error("Error retrieving employee details:", error);
    res
      .status(500)
      .send(`<pre>${error}</pre><br /><a href='/'>Go to home!</a>`);
  }
};

// Update employee details
const updateEmployeeDetails = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const emp_id = req.body.empId;
    const old_username = req.user.username;
    const new_username = req.body?.empUsername;
    const emp_contact = req.body?.empContact;
    const emp_address = req.body?.empAddress;

    if (old_username !== new_username) {
      await updateEmployeeUsername(old_username, new_username);
    }
    if (emp_contact) {
      await updateEmployeeContact(emp_contact, emp_id);
    }
    if (emp_address) {
      await updateEmployeeAddress(emp_address, emp_id);
    }

    res.redirect("/home");
  } catch (error) {
    console.error("Error updating employee details:", error);
    res
      .status(500)
      .send(`<pre>${error}</pre><br /><a href='/'>Go to home!</a>`);
  }
};

module.exports = { retrieveEmployeeDetails, updateEmployeeDetails };
