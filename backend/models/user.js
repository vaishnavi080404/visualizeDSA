/**
 * User Model - Database Schema
 * Final Year Project: Modular Data Design
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    },
    /* 
       Logic: We store an object where keys are the topic IDs 
       and values are the levels completed.
       Example: { "array": 2, "tree": 1, "graphs": 0 }
    */
    levelProgress: {
        type: Map,
        of: Number,
        default: {
            "array": 0,
            "matrix": 0,
            "string": 0,
            "hashing": 0,
            "recursion": 0,
            "stack": 0,
            "queue": 0,
            "tree": 0,
            "heap": 0,
            "graphs": 0,
            "linearsearch": 0,
            "binarysearch": 0,
            "bubblesort": 0,
            "selectionsort": 0,
            "mergesort": 0,
            "quicksort": 0,
            "insertionsort": 0,
            "linkedlist": 0
        }
    },createdAt: {
        type: Date,
        default: Date.now
    }
}, 
{
    timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);