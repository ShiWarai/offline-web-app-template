async function update_motors_on(event) {
    
    if(device) {
        var server = await device.gatt.connect()
        var service = await server.getPrimaryService(serviceUuid)
        
        var characteristic = await service.getCharacteristic(beginCharacteristicUuid)
        
        motors_static_data = await characteristic.readValue()
        
        if(motors_static_data.getUint8(0) == 0 && motors_static_data.getUint8(0) == 0) {
            document.getElementById('turn_motors').innerHTML = "Включить двигатели"
            document.getElementById('control-block').hidden = true
            motorsOn = false
        }
        else {
            document.getElementById('turn_motors').innerHTML = "Выключить двигатели"
            document.getElementById('control-block').hidden = false
            motorsOn = true
        }
        
        console.log("Updated state!");
    }
}

async function upload_motors_on(event) {
    if(device) {
        var server = await device.gatt.connect()
        var service = await server.getPrimaryService(serviceUuid)
        
        var characteristic = await service.getCharacteristic(beginCharacteristicUuid)
        
        var data = new Uint8Array(new ArrayBuffer(2))
        if(!motorsOn)
        {
            data[0] = 0b11111111
            data[1] = 0b00001111

            await characteristic.writeValue(data.buffer)
            
            motorsOn = true
            document.getElementById('turn_motors').innerHTML = "Выключить двигатели"
            document.getElementById('control-block').hidden = false
            
            console.log("Motors turn on")
        } else {
            data[0] = 0b00000000
            data[1] = 0b00000000

            await characteristic.writeValue(data.buffer)
            
            motorsOn = false
            document.getElementById('turn_motors').innerHTML = "Включить двигатели"
            document.getElementById('control-block').hidden = true
            
            console.log("Motors turn off")
        }
    }
}

async function update_states(event) {
    if(device) {
        var server = await device.gatt.connect()
        var service = await server.getPrimaryService(serviceUuid)
        
        var characteristic = await service.getCharacteristic(beginCharacteristicUuid+1)
        
        var motors_static_data = await characteristic.readValue()
                    
        var motors_data_receive = convert_to_motors_data(motors_static_data)
        console.log(motors_data_receive.flat())
        
        for(var m = 0; m < 12; m++)
        {
            for(var i = 0; i < 5; i++) {
                var value_name = ""
                
                switch(i) {
                    case 0:
                        value_name = "pos"
                        break
                    case 1:
                        value_name = "kp"
                        break
                    case 2:
                        value_name = "vel"
                        break
                    case 3:
                        value_name = "kd"
                        break
                    case 4:
                        value_name = "trq"
                        break
                    default:
                        break
                }
                
                var output = document.querySelector("#motor-" + (m+1) + " li span[name='" + value_name + "']")
                
                if(output) {
                    output.innerHTML = motors_data_receive[m][i]
                    
                    var input = document.querySelector("#motor-" + (m+1) + " li input[name='" + value_name + "']")
                    
                    if(input.value == '')
                        input.value = 0
                }
            }
        }
    }
}

async function upload_states(event) {
    if(device) {
        var server = await device.gatt.connect()
        var service = await server.getPrimaryService(serviceUuid)
        
        var characteristic = await service.getCharacteristic(beginCharacteristicUuid+2)
        
        for(var m = 0; m < 12; m++)
        {
            for(var i = 0; i < 5; i++) {
                var value_name = ""
                
                switch(i) {
                    case 0:
                        value_name = "pos"
                        break
                    case 1:
                        value_name = "kp"
                        break
                    case 2:
                        value_name = "vel"
                        break
                    case 3:
                        value_name = "kd"
                        break
                    case 4:
                        value_name = "trq"
                        break
                    default:
                        break
                }
                
                var input = document.querySelector("#motor-" + (m+1) + " li input[name='" + value_name + "']")
                
                if(input && input.value != '') {
                    motors_data_send[m][i] = input.valueAsNumber
                }
            }
        }
        
        console.log(motors_data_send)
        var data = new Float32Array(motors_data_send.flat())
        await characteristic.writeValue(data.buffer)
    }
}

async function send_motors_states(data) {
    if(device) {
        var server = await device.gatt.connect()
        var service = await server.getPrimaryService(serviceUuid)
        
        var characteristic = await service.getCharacteristic(beginCharacteristicUuid+2)
        
        console.log(data)
        var buffer = new Float32Array(data.flat())
        await characteristic.writeValue(buffer.buffer)
    }
}