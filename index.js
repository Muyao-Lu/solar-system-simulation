
let current_zoom = 1;

let offset_x = 0;
let offset_y = 0;

const base_speed = 1/31556925.216
let earth_orbit_period = base_speed * 1000000; /* Seconds to orbit */

let side_open = false;

let planets = [["mercury", 0, 0.24109589041095890410958904109589],
            ["venus", 0, 0.61643835616438356164383561643836],
            ["earth", 0,1],
            ["mars", 0, 1.8808493150684931506849315068493],
            ["jupiter", 0, 11.871232876712328767123287671233],
            ["saturn", 0, 19.871232876712328767123287671233],
            ["uranus", 0, 30687/365],
            ["neptune", 0, 61090/365]] /*Name, orbit-count, year length (in earth years)*/ 

let planets_data = {"mercury": ["Mercury", "(143, 143, 143)", "<h2>Description</h2> <p>The first planet from the sun, Mercury is also the smallest in the Solar System. Despite Mercury's size, it posesses the second highest density (besides earth) of the whole Solar System, due to it's disporportionally large iron-nickel core. In addition, the planet also ocassionly experience magnetic tornadoes, when the sun's magnetic field interacts with particles on Mercury's surface.</p> <h2> Quick Facts </h2> <ul><li>Named After: Messenger of the Roman Gods</li><li>Radius: 2440km</li> <li>Year length (Earth days): 88</li> <li>Day length (Earth hours): 1416 (59 days) </li> <li>Temperature Range: 430 to -180 (C)</li> <li>Moons: 0</li></ul>", 500],
    "venus": ["Venus", "(247, 214, 171)", "<h2>Description</h2> <p>The brightest object in the night sky (besides the moon), Venus is sometimes called Earth's 'Evil Twin' due to it's thick atmosphere which allows it to shine so brightly. Though conditions on it's surface are hellish due to a runaway greenhouse effect, some scientists hypothesize about the viability of life in it's high atmosphere, where the temperatures are much more favorable.</p> <h2> Quick Facts </h2> <ul><li>Named After: Roman Godess of Love</li><li>Radius: 6052km</li> <li>Year length (Earth days): 225</li> <li>Day length (Earth hours): 5832 (243 days)</li><li>Temperature Range: 475 (C)</li><li>Moons: 0 (has a few asteroids that orbit near it, known as 'quasi moons')</li></ul>", 300],
    "earth": ["Earth","(1, 107, 6)", "<h2>Description</h2> <p>Though most objects in our solar system are named after Greek deities, Earth proves to be an exception, with it's name being derrived from the Germanic word meaning 'Ground'. In addition, it is also the densest planet and largest planet in the Solar System, as well as the only planet with just 1 moon. Even little Mars has more moons than us...</p> <h2> Quick Facts </h2> <ul><li>Named After: Germanic Word for 'Ground' </li><li>Radius: 6378 </li> <li>Year length (Earth days): 365</li> <li>Day length (Earth hours): 24</li><li>Temperature: Check outside :)</li><li>Moons: 1</li></ul>", 300],
    "mars": ["Mars", "(186, 13, 13)", "<h2>Description</h2> <p>Named after the Roman God of war, Mars gained it's name through it's red hue in the sky. It has been one of humanity's most explored planets, partially due to it's similarity to Earth, with a very similar day length and axial tilt. Also, Mars has a mountain 3 times the size of Everest. </p> <h2> Quick Facts </h2> <ul><li>Named After: Roman God of War </li><li>Radius: 3396km</li> <li>Year length (Earth days): 687</li> <li>Day length (Earth hours): 23.9</li> <li>Temperature Range: 20 to -153 (C)</li><li>Moons: 2</li></ul>", 500],
    "jupiter": ["Jupiter", "(189, 118, 52)", "<h2>Description</h2> <p>Jupiter is often regarded as a mini solar system, posessing 4 moons around the size of Mercury and generating more heat itself than it receives from the sun. This gargantuan planet also has a magnetic field 1 billion km long and a storm 2 times as wide as earth.</p> <h2> Quick Facts </h2> <ul><li>Named After: King of the Roman Gods (Zeus in Greek Mythology) </li><li>Radius: 71492km</li> <li>Year length (Earth days): 4333</li> <li>Day length (Earth hours): 9.9</li><li>Temperature Range: -110 (C) (average temperature)</li><li>Moons:</li></ul>", 50],
    "saturn": ["Saturn", "(181, 163, 95)", "<h2>Description</h2> <p>Saturn is the furthest planet visible to the naked eye, and was named after the Titan (primordial god) of agriculture and prosperity. Being the only planet in the solar system with a density less than water, it would float in a pool big enough if it didn't fall apart (Saturn still has a rocky core, after all). A little known fact about it's famous ring system is that it's only 10m thick on average :) </p> <h2> Quick Facts </h2> <ul><li>Named After: Jupiter' Father (Kronos in Greek Mythology) </li><li>Radius: 60268km</li> <li>Year length (Earth days): 10756</li> <li>Day length (Earth hours): 10.7</li><li>Temperature Range: -140 (C) (average)</li></ul>", 50],
    "uranus": ["Uranus","(95, 139, 181)", "<h2>Description</h2> <p>Rolling around the sun sideways, Uranus has an axial tilt of nearly 100 degrees <em>and</em> is one of two planets that orbits the sun backwards (the other being Venus). Another special name about Uranus is the naming of it's moons. Though most moons are named after characters in Roman or Greek mythology, Uranus' moons are named after characters in Shakespeare's or Alexander Pope's works.</p> <h2> Quick Facts </h2> <ul><li>Named After: Saturn's Father, Primordial Deity of the Sky </li><li>Radius: 25559km</li> <li>Year length (Earth days): 30687</li> <li>Day length (Earth hours): 17</li><li>Temperature: -195 (C) (average) -224.2 (C) (coldest) </li></ul>", 60],
    "neptune": ["Neptune","(7, 1, 90)", "<h2>Description</h2> <p>This blue planet is the only one in the Solar System to be discovered through mathematics rather than observations, found in the mid 1800s. Since then, it has completed a total of one orbit around the sun, in 2011. Just 17 days after the discovery of this ice giant, it's first moon was discovered, probably astounding all astronomers. </p> <h2> Quick Facts </h2> <ul><li>Named After: Roman God of the Ocean </li><li>Radius: 24764km</li> <li>Year length (Earth days): 61090</li> <li>Day length (Earth hours): 16</li><li>Temperature: -200 (C) (average)</ul>", 60]
}

let star_positions = [[74, 96], [75, 63], [12, 48], [34, 16], [80, 28], [34, 54], [19, 4], [76, 40], [19, 13], [14, 98], [0, 94], [54, 39], [40, 27], [35, 26], [27, 41], [45, 92], [40, 58], [0, 46], [57, 18], [76, 45], [32, 69], [33, 21], [12, 40], [27, 88], [13, 42], [16, 27], [92, 86], [64, 12], [48, 28], [81, 28], [48, 59], [6, 52], [16, 98], [63, 37], [74, 77], [29, 39], [9, 91], [57, 81], [51, 71], [90, 47], [37, 27], [13, 14], [42, 63], [66, 30], [42, 61], [11, 27], [59, 62], [84, 63], [32, 53], [58, 34]]

let last_mousedown = null;
let down = false;
let scroll_target_delta = null;

let music_playing = false;
let locked = null;



function generate_orbit_pos(deg, id){
    let w = document.getElementById(id + "-orbit").offsetWidth;
    let h = document.getElementById(id + "-orbit").offsetHeight;

    let object_w = document.getElementById(id).offsetWidth;
    let object_h = document.getElementById(id).offsetHeight;

    let bbox_w = document.getElementById("bounding-box").offsetWidth;
    let bbox_h = document.getElementById("bounding-box").offsetHeight;
    if (id != "venus" && id != "uranus"){
        
        return [bbox_w/2 - w/2 * Math.cos(deg * (Math.PI / 180)) - object_w/2+offset_x, bbox_h/2 - h/2 * Math.sin(deg * (Math.PI / 180)) - object_h/2 + offset_y];
    }
    else{
        return [bbox_w/2 - w/2 * Math.cos((360-deg)* (Math.PI / 180)) - object_w/2+offset_x, bbox_h/2 - h/2 * Math.sin((360-deg) * (Math.PI / 180)) - object_h/2 + offset_y];
    }
    
}

function generate_fact_box(id){
    
    current_zoom = planets_data[id][3];
    
    for (let item of document.querySelectorAll("*")){
        item.style.setProperty("--scale", String(current_zoom));
    }
    
    setTimeout(function(){
        posx = document.getElementById(id).style.left
        posy = document.getElementById(id).style.top
        position = [+posx.substring(0, posx.length - 2), +posy.substring(0, posy.length - 2)]
        middle = [window.innerWidth/2, window.innerHeight/2]
        offset_x = (middle[0] - position[0])
        offset_y = (middle[1] - position[1])

        document.querySelector("#left-hint-tab").style.display = "block";
        document.querySelector("#name").textContent = planets_data[id][0];
        document.querySelector("#color-indicator").style.border = "5px solid rgb" + String(planets_data[id][1]);
        document.querySelector("#content").innerHTML = planets_data[id][2];
        side_open = true;

        for (let item of document.querySelectorAll("*")){
            item.style.setProperty("--offset-x", String(offset_x) + "px");
            item.style.setProperty("--offset-y", String(offset_y) + "px");
            
        }
        calculate_positions();
        setTimeout(function(){locked = id}, 10);
    }, 10)
}

for (let item of planets){
    document.getElementById(item[0]).addEventListener("click", function(){generate_fact_box(item[0])});
    setInterval(function(){
    if (item[1] <= 360){
        let res = generate_orbit_pos(item[1], item[0]);
        let x = res[0];
        let y = res[1];
        document.getElementById(item[0]).style.position = "absolute"; 
        if (item[0] == locked){
            let middle = [window.innerWidth/2, window.innerHeight/2]

            let dx = (middle[0] - x)
            let dy = (middle[1] - y)
            
            
            


            offset_x += dx
            offset_y += dy


            for (let item of document.querySelectorAll("*")){
                item.style.setProperty("--offset-x", String(offset_x) + "px");
                item.style.setProperty("--offset-y", String(offset_y) + "px");
            
            }

            document.getElementById(item[0]).style.left = String(x) + "px";
            document.getElementById(item[0]).style.top = String(y) + "px";

        }
        else{
            document.getElementById(item[0]).style.left = String(x) + "px";
            document.getElementById(item[0]).style.top = String(y) + "px";
        }
        
        
        
        document.getElementById(item[0] + "-shadow").style.transform = "rotate(" + String(180 + item[1]) + "deg)";
        item[1] += (360 * earth_orbit_period * 1/item[2])/100
        
    }
    else{
        item[1] -= 360;
    }
}, 10);
}





function scroll(event) {

    if (event.deltaY < 0){
        current_zoom *= 1.05
    }
    else{
        current_zoom /= 1.05
    }
    

    if (current_zoom < 0.5){
        current_zoom = 0.5;
    }

    for (let item of document.querySelectorAll("*")){
        item.style.setProperty('--scale', String(current_zoom));
    }

    
    if (event.deltaY < 0){

        

        

    }

    else{
        let dx = offset_x
        let dy = offset_y
        offset_x -= dx * 0.1
        offset_y -= dy * 0.1

    }

    for (let item of document.querySelectorAll("*")){
        item.style.setProperty("--offset-x", String(offset_x) + "px");
        item.style.setProperty("--offset-y", String(offset_y) + "px");
    }
    calculate_positions();
}

function mousedown(event){
    last_mousedown = [event.pageX, event.pageY];
    down = true;
    

}

function mousemove(event){
    
    if (scroll_target_delta != null){
        if (Math.abs(event.pageX - scroll_target_delta[0]) > 10 || Math.abs(event.pageY - scroll_target_delta[1]) > 10){
            scroll_target_delta = null;

        }
    }
    
    
    if (down){
        locked = null;
        let move_position = [event.pageX, event.pageY];
        dx = last_mousedown[0] - move_position[0]
        dy = last_mousedown[1] - move_position[1]

        offset_x -= dx;
        offset_y -= dy;
        last_mousedown = move_position

        for (let item of document.querySelectorAll("*")){
            item.style.setProperty("--offset-x", String(offset_x) + "px");
            item.style.setProperty("--offset-y", String(offset_y) + "px");
        }
        calculate_positions();
    }
    

}

function mouseup(event){
    last_mousedown = null;
    down = false;

}

function exit(){
    document.querySelector("#left-hint-tab").style.display = "none";
    side_open = false;
    locked = null;
}

function calculate_indicator(id){

    return (document.getElementById(id + "-orbit").offsetWidth)/2

    

}

function calculate_positions(){
    setTimeout(function(){
            for (let planet of planets){
                id = planet[0]
                let dist = calculate_indicator(id);
                let val = null;

                val = (90 * (-Math.abs(offset_x) + dist + (window.innerWidth/2))/(window.innerWidth))


                
                if (0  <= val && val <= 90){
                    document.querySelector("#" + id + "-line-indicator").style.display = "inline-block"
                    document.querySelector("#" + id + "-line-indicator").style.left = val + "%"
                }
                else{
                    document.querySelector("#" + id + "-line-indicator").style.display = "none"
                }
            }
        }, 10
    )


}

function modify_time(event){
    earth_orbit_period = base_speed * 10**event.target.value;
    document.querySelector("#rate").textContent = String(Math.round(10**event.target.value * 10)/10);

} 

function toggle_music(){
    if (! music_playing){
        document.querySelector("#music-player").play();
        document.querySelector("#music-button").className = "activated"
        music_playing = true
    }
    else{
        document.querySelector("#music-player").pause();
        document.querySelector("#music-button").className = "deactivated"
        music_playing = false
    }
}

document.getElementById("bounding-box").addEventListener("wheel", function(){scroll(event)});
document.getElementById("body").addEventListener("mousedown", function(){mousedown(event)});
document.getElementById("body").addEventListener("mousemove", function(){mousemove(event)});
document.getElementById("body").addEventListener("mouseup", function(){mouseup(event)});

document.getElementById("exit").addEventListener("click", exit);

document.getElementById("home").addEventListener("mousedown", function(event){
    locked = null
    current_zoom = 1;
    offset_x = 0;
    offset_y = 0;
    for (let item of document.querySelectorAll("*")){
        item.style.setProperty('--scale', String(current_zoom));
        item.style.setProperty("--offset-x", String(offset_x) + "px");
        item.style.setProperty("--offset-y", String(offset_y) + "px");
    }
    calculate_positions();
})

document.querySelector("#time-customizer").addEventListener("input", function(){modify_time(event)})
document.querySelector("#music-button").addEventListener("click", toggle_music)

setTimeout(calculate_positions, 100)

for (let i = 0; i<star_positions.length; i++){
    position = star_positions[i]
    new_star = document.createElement("div");
    new_star.className = "star";
    document.getElementsByTagName("body")[0].appendChild(new_star);
    new_star.style.left = String(position[0]) + "%";
    new_star.style.top = String(position[1]) + "%";
}

