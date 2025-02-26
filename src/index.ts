import dotenv from 'dotenv'

dotenv.config()

import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './problem4'

console.log(sum_to_n_a(10)) // 55
console.log(sum_to_n_b(10)) // 55
console.log(sum_to_n_c(10)) // 55

import './problem5/server'
