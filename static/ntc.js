/*

+-----------------------------------------------------------------+
|     Created by Chirag Mehta - http://chir.ag/projects/ntc       |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. have been written specifically
for the Name that Color JavaScript by Chirag Mehta unless otherwise
specified.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/

Sample Usage:

  <script type="text/javascript" src="ntc.js"></script>

  <script type="text/javascript">

    var n_match  = ntc.name("#6195ED");
    n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
    n_name       = n_match[1]; // This is the text string for the name of the match
    n_exactmatch = n_match[2]; // True if exact color match, False if close-match

    alert(n_match);

  </script>

*/

var ntc = {

  init: function() {
    var color, rgb, hsl;
    for(var i = 0; i < ntc.names.length; i++)
    {
      color = "#" + ntc.names[i][0];
      rgb = ntc.rgb(color);
      hsl = ntc.hsl(color);
      ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
    }
  },

  name: function(color) {

    color = color.toUpperCase();
    if(color.length < 3 || color.length > 7)
      return ["#000000", "Invalid Color: " + color, false];
    if(color.length % 3 == 0)
      color = "#" + color;
    if(color.length == 4)
      color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

    var rgb = ntc.rgb(color);
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var hsl = ntc.hsl(color);
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var ndf1 = 0; ndf2 = 0; ndf = 0;
    var cl = -1, df = -1;

    for(var i = 0; i < ntc.names.length; i++)
    {
      if(color == "#" + ntc.names[i][0])
        return ["#" + ntc.names[i][0], ntc.names[i][1], true];

      ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
      ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
      ndf = ndf1 + ndf2 * 2;
      if(df < 0 || df > ndf)
      {
        df = ndf;
        cl = i;
      }
    }

    return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false]);
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  hsl: function (color) {

    var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
    var min, max, delta, h, s, l;
    var r = rgb[0], g = rgb[1], b = rgb[2];

    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;

    s = 0;
    if(l > 0 && l < 1)
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

    h = 0;
    if(delta > 0)
    {
      if (max == r && max != g) h += (g - b) / delta;
      if (max == g && max != b) h += (2 + (b - r) / delta);
      if (max == b && max != r) h += (4 + (r - g) / delta);
      h /= 6;
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  rgb: function(color) {
    return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
  },

  names: [
["F0F8FF", "aliceblue"],
["FAEBD7", "antiquewhite"],
["00FFFF", "aqua"],
["7FFFD4", "aquamarine"],
["F0FFFF", "azure"],
["F5F5DC", "beige"],
["FFE4C4", "bisque"],
["000000", "black"],
["FFEBCD", "blanchedalmond"],
["0000FF", "blue"],
["8A2BE2", "blueviolet"],
["A52A2A", "brown"],
["DEB887", "burlywood"],
["5F9EA0", "cadetblue"],
["7FFF00", "chartreuse"],
["D2691E", "chocolate"],
["FF7F50", "coral"],
["6495ED", "cornflowerblue"],
["FFF8DC", "cornsilk"],
["DC143C", "crimson"],
["00FFFF", "cyan"],
["00008B", "darkblue"],
["008B8B", "darkcyan"],
["B8860B", "darkgoldenrod"],
["A9A9A9", "darkgray"],
["006400", "darkgreen"],
["A9A9A9", "darkgrey"],
["BDB76B", "darkkhaki"],
["8B008B", "darkmagenta"],
["556B2F", "darkolivegreen"],
["FF8C00", "darkorange"],
["9932CC", "darkorchid"],
["8B0000", "darkred"],
["E9967A", "darksalmon"],
["8FBC8F", "darkseagreen"],
["483D8B", "darkslateblue"],
["2F4F4F", "darkslategray"],
["2F4F4F", "darkslategrey"],
["00CED1", "darkturquoise"],
["9400D3", "darkviolet"],
["FF1493", "deeppink"],
["00BFFF", "deepskyblue"],
["696969", "dimgray"],
["696969", "dimgrey"],
["1E90FF", "dodgerblue"],
["B22222", "firebrick"],
["FFFAF0", "floralwhite"],
["228B22", "forestgreen"],
["FF00FF", "fuchsia"],
["DCDCDC", "gainsboro"],
["F8F8FF", "ghostwhite"],
["FFD700", "gold"],
["DAA520", "goldenrod"],
["808080", "gray"],
["008000", "green"],
["ADFF2F", "greenyellow"],
["808080", "grey"],
["F0FFF0", "honeydew"],
["FF69B4", "hotpink"],
["CD5C5C", "indianred"],
["4B0082", "indigo"],
["FFFFF0", "ivory"],
["F0E68C", "khaki"],
["E6E6FA", "lavender"],
["FFF0F5", "lavenderblush"],
["7CFC00", "lawngreen"],
["FFFACD", "lemonchiffon"],
["ADD8E6", "lightblue"],
["F08080", "lightcoral"],
["E0FFFF", "lightcyan"],
["FAFAD2", "lightgoldenrodyellow"],
["D3D3D3", "lightgray"],
["90EE90", "lightgreen"],
["D3D3D3", "lightgrey"],
["FFB6C1", "lightpink"],
["FFA07A", "lightsalmon"],
["20B2AA", "lightseagreen"],
["87CEFA", "lightskyblue"],
["778899", "lightslategray"],
["778899", "lightslategrey"],
["B0C4DE", "lightsteelblue"],
["FFFFE0", "lightyellow"],
["00FF00", "lime"],
["32CD32", "limegreen"],
["FAF0E6", "linen"],
["FF00FF", "magenta"],
["800000", "maroon"],
["66CDAA", "mediumaquamarine"],
["0000CD", "mediumblue"],
["BA55D3", "mediumorchid"],
["9370DB", "mediumpurple"],
["3CB371", "mediumseagreen"],
["7B68EE", "mediumslateblue"],
["00FA9A", "mediumspringgreen"],
["48D1CC", "mediumturquoise"],
["C71585", "mediumvioletred"],
["191970", "midnightblue"],
["F5FFFA", "mintcream"],
["FFE4E1", "mistyrose"],
["FFE4B5", "moccasin"],
["FFDEAD", "navajowhite"],
["000080", "navy"],
["FDF5E6", "oldlace"],
["808000", "olive"],
["6B8E23", "olivedrab"],
["FFA500", "orange"],
["FF4500", "orangered"],
["DA70D6", "orchid"],
["EEE8AA", "palegoldenrod"],
["98FB98", "palegreen"],
["AFEEEE", "paleturquoise"],
["DB7093", "palevioletred"],
["FFEFD5", "papayawhip"],
["FFDAB9", "peachpuff"],
["CD853F", "peru"],
["FFC0CB", "pink"],
["DDA0DD", "plum"],
["B0E0E6", "powderblue"],
["800080", "purple"],
["FF0000", "red"],
["BC8F8F", "rosybrown"],
["4169E1", "royalblue"],
["8B4513", "saddlebrown"],
["FA8072", "salmon"],
["F4A460", "sandybrown"],
["2E8B57", "seagreen"],
["FFF5EE", "seashell"],
["A0522D", "sienna"],
["C0C0C0", "silver"],
["87CEEB", "skyblue"],
["6A5ACD", "slateblue"],
["708090", "slategray"],
["708090", "slategrey"],
["FFFAFA", "snow"],
["00FF7F", "springgreen"],
["4682B4", "steelblue"],
["D2B48C", "tan"],
["008080", "teal"],
["D8BFD8", "thistle"],
["FF6347", "tomato"],
["40E0D0", "turquoise"],
["EE82EE", "violet"],
["F5DEB3", "wheat"],
["FFFFFF", "white"],
["F5F5F5", "whitesmoke"],
["FFFF00", "yellow"],
["9ACD32", "yellowgreen"]
]

}

ntc.init();
