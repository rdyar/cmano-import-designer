# CMANO stuff

```
local scenarioWeather = ScenEdit_GetWeather();
local clouds = scenarioWeather.undercloud;
-- Check and set hour, used to track hour of day
local hour = ScenEdit_GetKeyValue("Hour");
hour = tonumber(hour);
if hour == nil then
hour = 0; --assume scen starts at midnight, adjust if not
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,.8,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour >=0 and hour <=5  then
hour = hour + 1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,.8,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour >= 6 and hour <=12 then
clouds = clouds - .1;
hour = hour + 1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour >=13 and hour <=18 then
clouds = 0;
hour = hour + 1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour >=19 and hour <23 then
clouds = clouds +.15;
hour = hour + 1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif hour == 23 then
clouds = .8;
hour = 0;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));

else
 clouds = .8;
ScenEdit_SetWeather(11,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Hour", tostring(hour));
end
print(ScenEdit_GetWeather().undercloud); 
print(ScenEdit_GetWeather()); 
print("hour" ..hour); 


```
