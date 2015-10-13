Instructions
------------
My Spotify app can be run locally and no dependencies need to be downloaded. I aimed for an 
aesthetic and minimalist design as suggested by one of Nielsen's usability heuristics and 
so not much direction is needed.Simply open the html file and interact with the web page. 

Design Process
--------------
My design process was simple. Prior to starting the assignment I read over Nielsen's ten
usability heuristics. Then, during the design of my application I kept that window open 
to constantly remind myself what I was aiming for. The heuristics I kept in particular
mind were aesthetic and minimalist design, error prevention and consistency and standards.

Design Decisions
----------------
I had to make a ton of design decisions in my design process and I will attempt to list 
them all below:

1 - I chose to take in the year as a number input rather than text.  I did this with the
error prevention heuristic in mind. I set a minimum of 0 and a maximum of 2015 for the year
to avoid the user inputting an invalid year and causing problems with my search function.

2 - When a song is paused and then play is clicked the song starts off from where it left
off. However, when a song is paused and then a different song is played the first song is
reset. I chose to do this with Nielsen's consistency heuristic in mind. In all music players
that I can think of this is the pause, play, stop functionality and I wanted to make sure
my users would not miss a beat when they used my app. It caused a bit more Javascript 
development and logic but it was well worth it.

3 - In reference to the design decision above, a song could thus be in three states:
playing, paused, or stopped. However, according to Nielsen's minimalistic design heuristic 
and match between the system and the real world heuristic I chose to only display two states,
despite their being three states under the hood. Thus, the user only saw pause and play
buttons.

4 - In accordance with Nielsen's minimalist design heuristic I chose to only display the 
first 25 characters of any song title, album title, or artist name. It also coalesced with
Nielsen's aesthetic design heuristic as it made all the search results the same size and
thus much more aesthetically pleasing.

5 - To ease the congrunece between my app and the user's familiarity with Spotify I chose 
to use the Spotify color scheme. I felt that this was a prudent design decision and in 
accordance with Nielsen's consistency heuristic as it follows Spotify's platform conventions.

Notes
-----
My application works best on a Chrome browser. I did the majority of my testing in Chrome.
I tried to make my app as functional as possible with as little room for error as possible.
This was in accordance with Nielsen's error prevention heuristic as well as the assignment's
stipulation that this should be an exhaustive search. The fact that it is an exhaustive
search sometimes causes a lag in playing a sound clip. It was a point of frustration for me
that I could not find a work around for. However, this usually only happens for very large 
searches.