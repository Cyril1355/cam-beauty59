<script>
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            placeholder.innerHTML = data;
            
            // Récupère et exécute manuellement tous les scripts contenus dans le footer
            const scripts = placeholder.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerText);
            }
        });
</script>