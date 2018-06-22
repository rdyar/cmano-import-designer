# CMANO stuff

```local scenarioWeather = ScenEdit_GetWeather();
-- Clouds 
local clouds = ScenEdit_GetKeyValue("Clouds");
clouds = tonumber(clouds);
if clouds == nil then
clouds = 0.80;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Clouds", tostring(clouds));
-- Check and set hour, used to track hour of day
local hour = ScenEdit_GetKeyValue("Hour");
hour = tonumber(hour);
if hour == nil then
hour = 0;
ScenEdit_SetKeyValue("Hour", tostring(hour));

elseif clouds >= .11 then
clouds = clouds - .1;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Clouds", tostring(clouds));
elseif clouds >=.02 then
clouds = clouds - .02;
ScenEdit_SetWeather(scenarioWeather.temp,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Clouds", tostring(clouds));
else
 clouds = .8;
ScenEdit_SetWeather(11,scenarioWeather.rainfall,clouds,scenarioWeather.seastate);
ScenEdit_SetKeyValue("Clouds", tostring(clouds));
end
print(ScenEdit_GetWeather().undercloud); 
print(ScenEdit_GetWeather()); 
print(clouds .. " Time:" .. time);

```
