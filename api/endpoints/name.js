/**
 * @brief this is an example endpoint
 * @author Doriath Arthus
 * @date 2024
 */

"use strict";
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    console.log(`[${new Date().toLocaleString('fr-FR')}] checking role ${req.query.role} for user ${req.query.user}`)

    // if the username is in the form of "domain\GID", we only want the GID
    if(req.query.user.includes("\\")){
        req.query.user = req.query.user.split("\\")[1];
    }

    try{
        let userHasRole = await ldap_interface.checkRole(req.query.user, req.query.role);
        
        if(userHasRole){
            console.log(`ACCESS TO RESOURCE GRANTED`);
        }
        else{
            console.log(`ACCESS TO RESOURCE DENIED`);
        }

        res.json({
            status : "OK",
            hasRole : userHasRole
        })
    }
    catch(err){
        console.error(`[${new Date().toLocaleString('fr-FR')}] ERROR : an exception occured while checking role ${req.query.role} for user ${req.query.user}`);
        console.error(`[${new Date().toLocaleString('fr-FR')}] EXCEPTION ${err.code} : ${err.message}`);
        console.log(`[${new Date().toLocaleString('fr-FR')}] couldn't check access to resource, check error log for more info`);

        res.status(500).json({
            status : "ERROR",
            message : "an error occured while checking the role"
        })
    }

    console.log(); //print new line
})



module.exports = router;
