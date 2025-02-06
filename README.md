# A basic texthook for Dragon Quest 3 SFC
This requires the [Mesen](https://www.mesen.ca/) emulator, as it uses one of its convenient [Memory Callback Functions](https://www.mesen.ca/docs/apireference/callbacks.html).

A basic Node.js server is used for displaying the contents written to `output.txt` on a webpage so it can be used by pop-up dictionaries.

## Special Thanks
- Big Thanks to @ButThouMust and Armagon(draxxavvius) for patiently helping me through through the whole process.
- The table file `dq3_jp.tbl` is from `dq3r_toolsbyuu`. @ButThouMust formatted it into a table file (from the character list)
## How do I use this?
- ### Clone this repository
    - Clone or download this repository to your local machine.
- ### Add script to Mesen
    - Open your `Dragon Quest III - Soshite Densetsu e... (Japan).sfc` in Mesen.
    
        MD5: `7c7c7db73b0608a184cc5e1d73d7695b`

        SHA1: `b711341e4b1022d7645c5313840874aebc01b7b7`
    - `Debug > Script Window > Open`

        (Maybe also stop the currently running script on opening the script window)
    - Change directory path in the script to match your cloned repository location.
    - Run Script
- ### Server for the webpage
    - Navigate to the repository folder in your terminal.
    - `node server.js`
    - Find your webpage on `http://localhost:8000` in your browser.
