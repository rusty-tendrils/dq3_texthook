-- Put your path here
local directory = "/path/to/your/directory"


local memType = emu.memType.snesMemory  -- Added memType definition
local separator = package.config:sub(1, 1)

local tableFile = "dq3_jp.tbl"
local tablePath = directory .. separator .. tableFile
emu.log("Full path: " .. tablePath)
local table_data = {}

for line in io.lines(tablePath) do
  -- Regex adjusted to remove the \r in the end (might be wrong)
  local key, value = line:match("^(%x+)=(.-)\r?$")
  if key and value then
      table_data[key] = value
  end
end

local outFile = "output.txt"
local outPath = directory .. separator .. outFile
emu.log("Full path: " .. outPath)

local file = io.open(outPath, "w")
if not file then
    emu.log("Failed to open file for writing")
    return
end

function send_char(address, value)
    local bytes = emu.read16(0x7ebdf9, memType, false)
    local key = string.upper(string.format("%04x", bytes))
    
    file:write(table_data[key])
    
    if bytes == 0x00AC or bytes == 0x00AD then
        file:write('\n')
        file:flush()
    end

    if bytes == 0x00AF then
        file:flush()
    end

end

emu.addMemoryCallback(send_char, emu.callbackType.exec, 0xc1b0e5, 0xc1b0e5, emu.cpuType.snes, memType)