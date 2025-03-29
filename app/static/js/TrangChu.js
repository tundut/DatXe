let prevScrollPos = window.pageYOffset;
      window.onscroll = function() {
          let currentScrollPos = window.pageYOffset;
          if (prevScrollPos > currentScrollPos) {
              document.getElementById("navbar").style.top = "0";
          } else {
              document.getElementById("navbar").style.top = "-100px";
          }
          prevScrollPos = currentScrollPos;
      }

      const settingsButton = document.getElementById('settingsButton');
        const settingsPanel = document.getElementById('settingsPanel');
        const toggleThemeButton = document.getElementById('toggleTheme');
        
        settingsButton.onclick = () => {
            settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
        }

        toggleThemeButton.onclick = () => {
            document.body.classList.toggle('bg-dark');
            document.body.classList.toggle('text-light');
        }