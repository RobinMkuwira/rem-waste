// combine's the reducer's
import { combineReducers } from "@reduxjs/toolkit";
import stepper from './stepper'
import skip from './skip'

const root = combineReducers({
    stepper: stepper,
    skip: skip
})

export default root