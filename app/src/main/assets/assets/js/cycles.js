let cycle_1_turned = false
let cycle_2_turned = false
let cycle_3_turned = false

async function switch_cycle_1(event) {
    var motors_data_base = 
        [ [ 0.8, 12, 0, 10, 0 ], [ 0.9, 10, 0, 10, 0 ], [ -0.8, 10, 0, 4, 0 ], [ -0.8, 12, 0, 10, 0 ], [ -0.9, 10, 0, 10, 0 ], [ 0.8, 10, 0, 4, 0 ], [ -0.8, 12, 0, 10, 0 ], [ 0.9, 10, 0, 10, 0 ], [ -0.8, 10, 0, 4, 0 ], [ 0.8, 12, 0, 10, 0 ], [ -0.9, 10, 0, 10, 0 ], [ 0.8, 10, 0, 4, 0 ] ]
    
    cycle_1_turned = !cycle_1_turned
    
    if(cycle_1_turned) {
        document.getElementById('switch_cycle_1').style.background = "#ffe500"
        
        motors_data_send = deep_copy(motors_data_base)
    
        for(var m = 0; m < 12; m++) {
            if (m % 3 == 1)
                motors_data_send[m][3] = 4
            else if (m % 3 == 2)
                motors_data_send[m][3] = 2
        }
        
        await send_motors_states(motors_data_send)
        await sleep(1000)
    
        console.log("Begin of cycles")
        
        while(cycle_1_turned) {
            for(var m = 0; m < 12; m++) {
                if(~~(m / 3) == 0 || ~~(m / 3) == 3)
                {
                    if(m % 3 == 1) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.5
                    } else if (m % 3 == 2) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.5
                    }
                } else {
                    motors_data_send[m][0] = motors_data_base[m][0]
                }
            }

            await send_motors_states(motors_data_send)
            await sleep(300)

            for(var m = 0; m < 12; m++) {
                if(~~(m / 3) == 1 || ~~(m / 3) == 2)
                {
                    if(m % 3 == 1) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.5
                    } else if (m % 3 == 2) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.5
                    }
                } else {
                    motors_data_send[m][0] = motors_data_base[m][0]
                }
            }

            await send_motors_states(motors_data_send)
            await sleep(300)
        }

        motors_data_send = deep_copy(motors_data_base)
        await send_motors_states(motors_data_send)
        console.log("End of cycles")
    } else {
        document.getElementById('switch_cycle_1').style.background = "#20c9a0"
    }
}

async function switch_cycle_2(event) {
    var motors_data_base = 
        [ [ 0.8, 12, 0, 10, 0 ], [ 0.9, 10, 0, 10, 0 ], [ -0.8, 10, 0, 4, 0 ], [ -0.8, 12, 0, 10, 0 ], [ -0.9, 10, 0, 10, 0 ], [ 0.8, 10, 0, 4, 0 ], [ -0.8, 12, 0, 10, 0 ], [ 0.9, 10, 0, 10, 0 ], [ -0.8, 10, 0, 4, 0 ], [ 0.8, 12, 0, 10, 0 ], [ -0.9, 10, 0, 10, 0 ], [ 0.8, 10, 0, 4, 0 ] ]
    
    cycle_2_turned = !cycle_2_turned
    
    if(cycle_2_turned) {
        document.getElementById('switch_cycle_2').style.background = "#ffe500"
        
        motors_data_send = deep_copy(motors_data_base)
    
        for(var m = 0; m < 12; m++) {
            if (m % 3 == 1)
                motors_data_send[m][3] = 4
            else if (m % 3 == 2)
                motors_data_send[m][3] = 2
        }
        
        await send_motors_states(motors_data_send)
        await sleep(1000)
    
        console.log("Begin of cycles")
        
        while(cycle_2_turned) {
            for(var m = 0; m < 12; m++) {
                if(~~(m / 3) == 0 || ~~(m / 3) == 2)
                {
                    if(m % 3 == 0) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    } else if(m % 3 == 1) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    } else if (m % 3 == 2) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    }
                } else {
                    motors_data_send[m][0] = motors_data_base[m][0]
                }
            }

            await send_motors_states(motors_data_send)
            await sleep(200)
            
            for(var m = 0; m < 12; m++) {
                if(~~(m / 3) == 0 || ~~(m / 3) == 2)
                {
                    if(m % 3 == 0) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    } else if(m % 3 == 1) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 0.6
                    } else if (m % 3 == 2) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 0.7
                    }
                } else {
                    motors_data_send[m][0] = motors_data_base[m][0]
                }
            }

            await send_motors_states(motors_data_send)
            await sleep(400)
            
            for(var m = 0; m < 12; m++) {
                if(~~(m / 3) == 0 || ~~(m / 3) == 2)
                {
                    motors_data_send[m][0] = motors_data_base[m][0]
                } else {
                    if(m % 3 == 0) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    } else if(m % 3 == 1) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 0.6
                    } else if (m % 3 == 2) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 0.7
                    }
                }
            }

            await send_motors_states(motors_data_send)
            await sleep(200)
            
            for(var m = 0; m < 12; m++) {
                if(~~(m / 3) == 0 || ~~(m / 3) == 2)
                {
                    motors_data_send[m][0] = motors_data_base[m][0]
                } else {
                    if(m % 3 == 0) {
                            motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    } else if(m % 3 == 1) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    } else if (m % 3 == 2) {
                        motors_data_send[m][0] = Math.sign(motors_data_base[m][0]) * 1.3
                    }
                }
            }

            await send_motors_states(motors_data_send)
            await sleep(400)
            
            for(var m = 0; m < 12; m++) {
                motors_data_send[m][0] = motors_data_base[m][0]
            }

            await send_motors_states(motors_data_send)
            await sleep(400)
        }
        
        motors_data_send = deep_copy(motors_data_base)
        await send_motors_states(motors_data_send)
        console.log("End of cycles")
    } else {
        document.getElementById('switch_cycle_2').style.background = "#20c9a0"
    }
}