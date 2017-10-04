var time = 172; // Game seconds
var hour = 0;
var jumpReady = false;
var leftDoor = 0;
var leftLight = 0;
var rightDoor = 0;
var rightLight = 0;
var cameraMode = 0;
var showStage = [1, 1, 1];
var activeCamImg;
var night = 1;
var power = 100;
var powerUsage = (leftDoor + rightDoor + rightLight + leftLight + cameraMode + 1);
var decrementPower = 15000 / powerUsage;
var time = 1;
var cam1aClicks = 0;
var order;
var rooms= [];


// reset
function init() {
    night = 1;
    time = 172;
    jumpReady = false;
    powerOutAttacked = false;
    alreadyAttacked = false;
    rightDoor = 0;
    leftDoor = 0;
    power = 100;
    cam1aClicks = 0;
    // location.replace('/index.html');
}

function updateTime() {
    setInterval(function() {
        time--;
        console.log(time)
    }, 3000);
}

function updateHour() {
    hour++
    $('#hour-counter').html(hour)
}

// game update per second
function updateGameTime() {
    setInterval(updateHour, 86000); // 1 game hour == 86 rl seconds = 28 game seconds
    // new day
    if (time === 0) {
        night++;
        transitionScreen(night);
    }
}

// bug
function updatePowerUsage() {
    powerUsage = leftDoor + rightDoor + rightLight + leftLight + cameraMode + 1;
    $('#usage-counter img').attr('src', 'resources/img/game/batt_usage_'+powerUsage+'.png');
    decrementPower = 15000 / powerUsage;
    console.log(powerUsage, decrementPower);
    clearInterval(powerInterval);
    var powerInterval = setInterval(function() {
        console.log("Toggled. Power interval updated: ", decrementPower);
        power--;
        $('#power-counter').html(power);
    }, decrementPower);
    // $('#usage-counter img').attr('src', 'resources/img/game/batt_usage_'+powerUsage+'.png');
    // setInterval(function() {
    //     console.log(decrementPower);
    //     power--;
    //     console.log("Power: " + power + "%, Usage: " + decrementPower);
    //     $('#power-counter').html(power);
    // }, decrementPower);
}

function addNight() {
    $('.container:not(#start-screen)').addClass('animate-out');
    // change transition image
    $('.transition img').src('/resources')
    // animate in transition screen


}

function moveBonny() {
    // check nights

    // check time

    // check if chika

    // check if freddy

    // check if foxy

}

function moveChika() {
    // check nights

    // check time

    // check if bonny

    // check if freddy

    // check if foxy
}

function moveFreddy() {
    // check nights

    // check time

    // check if chika

    // check if bonny

    // check if foxy
}

function moveFoxy() {

}

function powerOut() {

}

function playerWins() {

}

function muteCall() {
    $("#call").get(0).pause();
    $('.mute-call').css('display', 'none');
}

function toggleLeftDoor() {
    leftDoor?leftDoor = 0:leftDoor = 1;
    updatePowerUsage();
    $(".door-on").get(0).play();
    $('.left-switch > img').attr('src', 'resources/img/rooms/left_switch_door_'+leftDoor+'_light_'+leftLight+'.png');
    $('.left-door > img').attr('src', 'resources/img/doors/left_door_'+leftDoor+'.gif');
}

function toggleRightDoor() {
    rightDoor?rightDoor = 0:rightDoor = 1;
    updatePowerUsage();
    $(".door-on").get(0).play();
    $('.right-switch > img').attr('src', 'resources/img/rooms/right_switch_door_'+rightDoor+'_light_'+rightLight+'.png');
    $('.right-door > img').attr('src', 'resources/img/doors/right_door_'+rightDoor+'.gif');
}

function toggleLeftLight() {
    $('#left-light-toggle').mousedown(function() {
        leftLight?leftLight = 0:leftLight = 1;
        updatePowerUsage();
        $(".light-on").get(0).play();
        $('.left-switch > img').attr('src', 'resources/img/rooms/left_switch_door_'+leftDoor+'_light_'+leftLight+'.png');
        $('.background .main-screen').attr('src', 'resources/img/rooms/safe_room/safe_room_left_light_'+leftLight+'_right_light_'+rightLight+'.png');
    })
    $('#left-light-toggle').mouseup(function() {
        leftLight?leftLight = 0:leftLight = 1;
        updatePowerUsage();
        $(".light-on").get(0).pause();
        $('.left-switch > img').attr('src', 'resources/img/rooms/left_switch_door_'+leftDoor+'_light_'+leftLight+'.png');
        $('.background .main-screen').attr('src', 'resources/img/rooms/safe_room/safe_room_left_light_'+leftLight+'_right_light_'+rightLight+'.png');
    })
}

function toggleRightLight() {
    $('#right-light-toggle').mousedown(function() {
        rightLight?rightLight = 0:rightLight = 1;
        updatePowerUsage();
        $(".light-on").get(0).play();
        $('.right-switch > img').attr('src', 'resources/img/rooms/right_switch_door_'+rightDoor+'_light_'+rightLight+'.png');
        $('.background .main-screen').attr('src', 'resources/img/rooms/safe_room/safe_room_left_light_'+leftLight+'_right_light_'+rightLight+'.png');
    })
    $('#right-light-toggle').mouseup(function() {
        rightLight?rightLight = 0:rightLight = 1;
        updatePowerUsage();
        $(".light-on").get(0).pause();
        $('.right-switch > img').attr('src', 'resources/img/rooms/right_switch_door_'+rightDoor+'_light_'+rightLight+'.png');
        $('.background .main-screen').attr('src', 'resources/img/rooms/safe_room/safe_room_left_light_'+leftLight+'_right_light_'+rightLight+'.png');
    })
}

function cameraState() {
    console.log('Camera clicked!');
    cameraMode ? cameraDown() : cameraUp();
}

function cameraUp() {
    cameraMode = 1;
    updatePowerUsage();
    $('.camera-toggle').get(0).play();
    $('#camera-bg2 img').attr('src', 'resources/img/cams/camera_mode_1.gif').toggleClass('display-1');
    setTimeout(function() {
        $('.camera-menu').removeClass('display-0, display-1').addClass('display-1');
        $('#camera-bg1 img').attr('src', activeCamImg);
        // $('#camera-bg2 img').css('opacity', 0);
        console.log('End cameraState function..');
        $('#camera-bg2 img').removeClass('display-0, display-1').addClass('display-0');
    }, 600);
}

function cameraDown() {
    cameraMode = 0;
    updatePowerUsage();
    $('.camera-toggle').get(0).play();
    $('.camera-menu').removeClass('display-0, display-1').addClass('display-0');
    $('#camera-bg2 img').removeClass('display-0, display-1').addClass('display-1').attr('src', 'resources/img/cams/camera_mode_0.gif');
    setTimeout(function() {
        $('#camera-bg2 img').removeClass('display-0, display-1').addClass('display-0');
        // $('#camera-bg1 img').attr('src', activeCamImg);
        // $('#camera-bg2 img').css('opacity', 0);
        console.log('End cameraState function..');
    }, 600);
}

function bonnieScare() {

}

function bonnieAttackIfClosed() {


}

function disableBonnie() {

}

// function disableButtons() {
//     $('.left-door-switch').hide();
//     $('.right-door-switch').hide();
//     $('.control').hide();
//     $('.toggle-camera').hide();
// }

function removeDoors() {

}

function powerOutAttacked() {
    if (power === 0) {
        return true
    } else {
        return false
    }
}

function powerOutFreddy() {
    if(powerOutAttacked() === true) {
        disableButtons();
        $('#main-screen').css('background-image', 'url()');
        menu();
    }
}

function transitionScreen(night) {
    $('.container:not(#start-screen)').addClass('animate-out');

    setTimeout(function() {
        $('.transition').addClass('animate-out');
    }, 2900);

    setTimeout(function() {
        $('.transition').removeClass('animate-out');
        $('.transition img').attr('src', '/resources/img/game/transition-fade.gif');
        $('.transition h2').toggleClass('display-1');
        $('.transition #night-count').html(night);
        $('.camera-cycle').get(0).play();
    }, 4000);

    setTimeout(function() {
        $('.transition').addClass('animate-out');
    }, 6000);

    setTimeout(function() {
        $('.container:not(#start-screen)').css('opacity', '1');
        $('.transition').css('display', 'none');
    }, 6900);

    activeCamImg = '/resources/img/rooms/1a_show_stage/cam_1a_b'+showStage[0]+'_c'+showStage[0]+'_f'+showStage[0]+'.png';

    console.log(activeCamImg);
}


$('document').ready(function() {
    console.log('DOM is loaded...');
    if (location.pathname === '/main.html') {
        init();
        updateTime();
        setInterval(updateGameTime, 1000);
        toggleLeftLight();
        toggleRightLight();
        updatePowerUsage();
        $("#game-start").get(0).play();
        $("#game-start")[0].volume = 0.3;
        $("#ambience2").get(0).play();

        // show which night
        transitionScreen(night);

        $('#cam1a').click(function() {
            cam1aClicks++;
            if (cam1aClicks >= 3 && cam1aClicks < 5 && showStage[0] == 1 && showStage[1] == 1 && showStage[2] == 1) {
                console.log('Cam1a clicks: ', cam1aClicks);
                activeCamImg = '/resources/img/rooms/1a_show_stage/cam_1a_turn.png';
                $('#camera-id').html($(this).data('camname'));
                $('#camera-bg1 img').attr('src', activeCamImg);
                $('.camera-menu ul li').removeClass('active');
                $(this).parent().toggleClass('active');
                $('.camera-cycle').get(0).play();
            } else {
                activeCamImg = '/resources/img/rooms/1a_show_stage/cam_1a_b'+showStage[0]+'_c'+showStage[0]+'_f'+showStage[0]+'.png';
                $('#camera-id').html($(this).data('camname'));
                $('#camera-bg1 img').attr('src', activeCamImg);
                $('.camera-menu ul li').removeClass('active');
                $(this).parent().toggleClass('active');
                $('.camera-cycle').get(0).play();
            }
        }),

        $('#cam1b').click(function() {
            activeCamImg = '/resources/img/rooms/1b_dining_area/1b_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam1c').click(function() {
            activeCamImg = '/resources/img/rooms/1c_pirate_cove/1c_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam2a').click(function() {
            activeCamImg = '/resources/img/rooms/2a_west_hall/2a_b0_c0_f0.gif';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam2b').click(function() {
            activeCamImg = '/resources/img/rooms/2b_west_hall_corner/2b_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam3').click(function() {
            activeCamImg = '/resources/img/rooms/3_supply_closet/3_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam4a').click(function() {
            activeCamImg = '/resources/img/rooms/4a_east_hall/4a_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam4b').click(function() {
            activeCamImg = '/resources/img/rooms/4b_east_hall_corner/4b_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam5').click(function() {
            activeCamImg = '/resources/img/rooms/5_backstage/5_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        }),
        $('#cam6').click(function() {
            activeCamImg = '/resources/img/rooms/6_kitchen/6_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        })
        $('#cam7').click(function() {
            activeCamImg = '/resources/img/rooms/7_restroom/7_b0_c0_f0.png';
            $('#camera-id').html($(this).data('camname'));
            $('#camera-bg1 img').attr('src', activeCamImg);
            $('.camera-menu ul li').removeClass('active');
            $(this).parent().toggleClass('active');
            $('.camera-cycle').get(0).play();
        })
    }
});
