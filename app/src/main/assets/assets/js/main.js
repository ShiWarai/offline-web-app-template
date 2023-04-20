var deviceName = "RDB-1"
var serviceUuid = 'e7112e6c-c396-11ed-afa1-0242ac120002'
var beginCharacteristicUuid = 0xffffff00

var device = null

var currentLeg = 1
var motorsOn = false

let motors_static_data = null

let motors_data_send = new Array(12);
for(var i = 0; i < 12; i++)
    motors_data_send[i] = new Array(5).fill(0)

const disconnected_color = 'rgb(250, 0, 0)'
const connected_color = 'rgb(0, 250, 0)'

// Функция для подключения к устройству Bluetooth по названию
async function connectToDevice(name) {
    // Запрашиваем у пользователя разрешение на доступ к Bluetooth устройствам
    let device = await navigator.bluetooth.requestDevice({
        filters: [{
          name: name
        }],
        optionalServices: [serviceUuid]
    })
    
    return device
}

async function request_connection(event) {
    console.log("Connect...")
    
    try {
        device = await connectToDevice(deviceName)
        var server = await device.gatt.connect()
        
        console.log("Connected!")
        
        await sleep(2000)
        
        update_motors_on()
        
        document.getElementById('connection_indicator').style.background = connected_color
    }
    catch {
        console.log("Device hasn\'t selected")
    }
}

async function request_disconnect(event) {
    console.log("Disconnect...")
    await device.gatt.disconnect()
    
    device = null
    
    document.getElementById('connection_indicator').style.background = disconnected_color
    
    console.log("Disconnected!")
}

async function set_leg(element) {
    var lastLeg = currentLeg
    
    switch(element.id) {
        case 'leg-1':
            currentLeg = 1
            break
        case 'leg-2':
            currentLeg = 2
            break
        case 'leg-3':
            currentLeg = 3
            break
        case 'leg-4':
            currentLeg = 4
            break
        default:
            break
    }
    
    if(lastLeg != currentLeg) {
        for(var m = 1; m <= 3; m++) {
            var last_motor = (lastLeg - 1)*3 + m
            var new_motor = (currentLeg - 1)*3 + m

            var list = document.getElementById('motor-' + last_motor)
            list.id = 'motor-' + new_motor
            list.firstChild.textContent = "Мотор " + new_motor

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

                var input = document.querySelector("#motor-" + new_motor + " li input[name='" + value_name + "']")

                if(input)
                    input.value = motors_data_send[new_motor-1][i]
            }
        }

        lastLeg = currentLeg
    }
}