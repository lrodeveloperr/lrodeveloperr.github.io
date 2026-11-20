HSC.youtubeModulesReady=(HSC.whenYouTubeResumed?HSC.whenYouTubeResumed():Promise.resolve()).then(()=>HSC.geo.ready).then(()=>{
for (const initialize of HSC.youtubeRuntime) initialize();
delete HSC.youtubeRuntime;

});
HSC.youtubeModulesReady.catch(()=>{});
