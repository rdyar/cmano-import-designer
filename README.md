# CMANO stuff

```
math.randomseed(os.time());
local scenarioWeather = ScenEdit_GetWeather();
local clouds = scenarioWeather.undercloud;
-- Check and set hour, used to track hour of day
local hour = ScenEdit_GetKeyValue("Hour");
hour = tonumber(hour);
print("hour " ..hour); 
if hour == nil then
hour = 0; --assume scen starts at midnight, adjust if not
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,.8,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));
local earlyClouds = math.random(8,10)/10;
ScenEdit_SetKeyValue("EarlyClouds", tostring(earlyClouds));


elseif hour >=0 and hour <=5  then
hour = hour + 1;
local earlyClouds = ScenEdit_GetKeyValue("EarlyClouds");
earlyClouds = tonumber(earlyClouds);
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,earlyClouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));
earlyClouds = earlyClouds - .05;
ScenEdit_SetKeyValue("EarlyClouds", tostring(earlyClouds));

elseif hour >= 6 and hour <=12 then
clouds = clouds - .07;
hour = hour + 1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour >=13 and hour <=17 then
clouds = 0;
hour = hour + 1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour >=18 and hour <23 then
clouds = clouds +.15;
hour = hour + 1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour == 23 then
clouds = .8;
hour = 0;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));
--reset earlyClouds
local earlyClouds = math.random(7,10)/10;
ScenEdit_SetKeyValue("EarlyClouds", tostring(earlyClouds));

else
 print("hello");
end
print(ScenEdit_GetWeather().undercloud); 
print(ScenEdit_GetWeather()); 
print("----");


```
