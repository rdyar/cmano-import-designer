# CMANO stuff


clouds = ScenEdit_GetKeyValue("Clouds")
clouds= tonumber(clouds)
print(clouds) 
if clouds == nil then
clouds = .8;
ScenEdit_SetKeyValue("Clouds", tostring(clouds));
elseif clouds >= .1 then
clouds = clouds -.1;
ScenEdit_SetKeyValue("Clouds", tostring(clouds));
else
 clouds = .5;
ScenEdit_SetKeyValue("Clouds", tostring(clouds));
end
