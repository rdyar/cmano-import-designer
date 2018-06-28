# CMANO stuff
scen load?
```
math.randomseed(os.time());
-- Set halfhour, used to track hour of day
local halfHour = 34; --needs offset relative to midnight
ScenEdit_SetWeather(15,0,0,1);
ScenEdit_SetKeyValue("HalfHour",  tostring(halfHour));
local earlyClouds = math.random(8,10)/10;
ScenEdit_SetKeyValue("EarlyClouds", tostring(earlyClouds));
print("Scen loaded halfhour = " ..halfHour); 

```
hourly action

```
math.randomseed(os.time());
local scenarioWeather = ScenEdit_GetWeather();
local clouds = scenarioWeather.undercloud;
-- Check and set hour, used to track hour of day
local halfHour = ScenEdit_GetKeyValue("HalfHour");
halfHour = tonumber(halfHour);
-- early clouds is used for the early morning hours to have the change be slower
local earlyClouds = ScenEdit_GetKeyValue("EarlyClouds");
earlyClouds = tonumber(earlyClouds);
print("halfHour = " ..halfHour);
print("early clouds = " ..earlyClouds);

if halfHour >=0 and halfHour <=10  then
halfHour = halfHour + 1;
local rain = 0;
local seas = 1
-- if there is heavy fog add light rain
	if earlyClouds >= 1.06 then 
		rain = 4;
		seas = 3
	end
ScenEdit_SetWeather(28,rain,earlyClouds,seas);
ScenEdit_SetKeyValue("HalfHour", tostring(halfHour));
earlyClouds = earlyClouds - .02;
ScenEdit_SetKeyValue("EarlyClouds", tostring(earlyClouds));

elseif halfHour >= 11 and halfHour <=35 then
clouds = clouds - .04;
  if clouds <= .05 then clouds = 0;
  end
halfHour = halfHour + 1;
ScenEdit_SetWeather(31,0,clouds,2);
ScenEdit_SetKeyValue("HalfHour", tostring(halfHour));

elseif halfHour >=36 and halfHour <=46 then
clouds = clouds +.07;
halfHour = halfHour + 1;
ScenEdit_SetWeather(29,0,clouds,3);
ScenEdit_SetKeyValue("HalfHour", tostring(halfHour));

elseif halfHour == 47 then
clouds = .7;
halfHour = 0;
ScenEdit_SetWeather(29,0,clouds,2);
local w = ScenEdit_GetWeather();
local wtemp = w.temp;
local wclouds = w.undercloud;
local wseas = w.seastate;
local wrain = w.rainfall;
ScenEdit_SetKeyValue("HalfHour", tostring(halfHour));
--reset earlyClouds - random, 1.1 is heavy fog, .7 is cloudy
earlyClouds = math.random(7,11)/10;
ScenEdit_SetKeyValue("EarlyClouds", tostring(earlyClouds));
print (earlyClouds);
local TimeVar = ScenEdit_CurrentTime();
TimeVar = TimeVar + 7200; --adjust time to key west
local time = (os.date("%A %B %d %H%M ",TimeVar));

local fogMessage = "";
local veryHeavyFog = "*****VERY HEAVY FOG TONIGHT, LIGHT RAIN*****<br><br>We expect to see very heavy fog and light rain starting in the next 30-40 minutes, the Sea State will also increase slightly while it is raining. The rain should not last long. The fog will last for several hours, then should begin to clear by 0600. Solid low clouds will persist till mid morning. We expect clear skies for at least an hour or two in the late afternoon."
local heavyFog = "***HEAVY FOG TONIGHT***<br><br>We expect to see heavy fog starting in the next 30-40 minutes, lasting for several hours. The fog should begin to clear by 0430. Solid low clouds will persist till mid morning. We expect clear skies for at least an hour or two in the late afternoon."
local moderateFog = "**MODERATE FOG TONIGHT**<br><br>We expect to see fog tonight starting in the next 30-40 minutes, lasting for a couple hours. The fog should begin to clear by 0300. Solid low clouds should start to break up by early morning. We expect clear skies for a few hours this afternoon."
--local lightFog = "***LIGHT FOG TONIGHT*** We expect to see fog tonight starting in the next hour, lasting for an hour or so. It should clear quickly and we still expect clear skies for several hours this afternoon."
local noFog = "No fog tonight, skies should be clear by late morning with several hours of clear skies."
  	if earlyClouds <= .8 then fogMessage = noFog;
  		elseif earlyClouds == .9 then fogMessage = moderateFog;
  			elseif earlyClouds == 1 then fogMessage = heavyFog;
  				elseif earlyClouds == 1.1 then fogMessage = veryHeavyFog;
  			end

ScenEdit_SpecialMessage(ScenEdit_PlayerSide(), '<div style="text-transform: uppercase;font-family:Courier New;"><p>' .. time .. ' (KeyWest)</p><P>COMMANDER,</P><P>CURRENT WEATHER REPORT,</P> TEMPERATURE: ' .. wtemp .. 'C (High: 41C, Low: 25C) <br>RAIN STATE: ' .. wrain .. '<br>CLOUD LEVEL: Moderate middle clouds, 7-16k feet, light high clouds 27-30k feet<br>SEA STATE: ' .. wseas .. '<p>' .. fogMessage .. '</p><p>It looks like the weather for the next few days should be more of the same, night and morning low clouds with a chance of fog in the very early morning hours.</p><p>Sea State has been fairly mild, usually 1-2 in the early morning, increasing to 3 in the afternoon and evening.</p></div>');
else
 print("Something is wrong, halfhour not set?");
end

print(ScenEdit_GetWeather());

```

Fish Generator - set to merchant here

```
math.randomseed(os.time())

merch_num = math.random(5,10) --change 5 or 10 to your specified minimum and maximum number of merchants

for i = 1,merch_num do
redo_count = 0
::redo::
local lat_var = math.random(1,(10^13))
local lon_var = math.random(1,(10^13))
v_lat = math.random(20,28) + (lat_var/(10^13)) --change the first set (south is negative) to your specified minimum and maximum latitude values; it's important that the first number is smaller than the second.
v_lon = math.random(-95,-63) + (lon_var/(10^13)) --change first set (west is negative!) to your specified minimum and maximum longitude values; it's important that the first number is smaller than the second.
elevation = World_GetElevation({latitude=v_lat, longitude=v_lon})
if elevation > -10 then --Checks to see if the water is deep enough, adjust as you please
redo_count = redo_count + 1
print("no")
if redo_count >50 then
print (redo_count .. 'ships were not able to find a suitable spot for placement. Re-check latitude and longitude settings')
break --this cuts the loop if there are no suitable positions found after 50 tries, prevents infinite loop/game freeze
else
goto redo --retries the placement if the water is too shallow
end
end
DBIDTABLE = { 775, 2027, 2029, 2028, 2030, 774, 2026, 2031, 2775, 2023, 773, 2774, 1001, 1374, 2773, 2776, 1006, 222, 1599, 2034, 1002, 1317, 144, 339, 275, 145, 2022, 259 } --list of DBIDs
DBID = DBIDTABLE[math.random( 1, #DBIDTABLE)]
local new_merch = ScenEdit_AddUnit({side='Merchant', type='Ship',name='Merchant #'..i, dbid=DBID,latitude=v_lat,longitude=v_lon})
local fuel = new_merch.fuel
fuel[3001].current = fuel[3001].max*math.random(600, 800)/1000
new_merch.fuel = fuel
--ScenEdit_AssignUnitToMission( new_merch.name, 'VLADIVOSTOK')
print (new_merch.name..' with dbid '..DBID..' was created in water with a depth of '..elevation..'m')
end
```
