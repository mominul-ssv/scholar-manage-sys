// ========================================= (GENERATE ADMIN INFORMATION) =========================================== //
const bcrypt = require('bcrypt');
const Admin = require('../../model/adminSchema.js');

// Getting information from .env file
const secretEmail = process.env.ADMIN_EMAIL;
const secretPassword = process.env.ADMIN_PASSWORD;
const secretToken = process.env.ADMIN_TOKEN;

exports.admin_generate = () => {
    Admin.findOne({}, async (err, foundAdmins) => {
        // Hashing admin password
        const hashedPassword = await bcrypt.hash(secretPassword, 10);
        if (!err) {
            // CREATE new admin
            if (foundAdmins === null) {
                const admin = new Admin({
                    email: secretEmail,
                    password: hashedPassword,
                    token: secretToken
                });
                await admin.save();
            } else {
                // UPDATE admin information if changes occurs in .env file
                // Change in password
                await bcrypt.compare(secretPassword, foundAdmins.password, (error, result) => {
                        if (result !== true) {
                            Admin.findOneAndUpdate(
                                {token: secretToken},
                                {password: hashedPassword},
                                {new: true},
                                async (err, data) => {
                                    if (!err) {
                                        console.log(data);
                                    } else {
                                        console.log(err);
                                    }
                                });
                        }
                    }
                );
                // Change in email
                if (foundAdmins.email !== secretEmail) {
                    Admin.findOneAndUpdate(
                        {token: secretToken},
                        {email: secretEmail},
                        {new: true},
                        async (err, data) => {
                            if (!err) {
                                console.log(data);
                            } else {
                                console.log(err);
                            }
                        }
                    );
                }
            }
        } else {
            console.log(err);
        }
    });
}
// ========================================= (GENERATE ADMIN INFORMATION) =========================================== //