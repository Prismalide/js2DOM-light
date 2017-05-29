# js2DOM-light  

    Ecrire et générer du DOM-HTML avec javascript  
    
C'est une version réduite de  [**js2DOM**](), plus complet.  
**js2DOM** est au stade d'étude, il n'est pas encore fonctionnel.  

### Projet  
Il existe beaucoup d'injecteur de DOM en javascript mais je trouve les syntaxes d'écriture peu optimisées et visuellement lourdes.  
js2DOM propose d'autres approches, dans le rendu et le codage, faciles à mettre en œuvre (proche du html ou compatibilité avec JSON) et qui permettent des fonctionnalités plus évoluées.  
js2DOM est très souple et permet à chacun de choisir parmis plusieurs `codage javascript` selon ces cas d'utilisation.  

### version/licence
Actuellement en version `Alpha`  
La dernière version fonctionnelle est ici : [lib/js2DOM-light.js](lib/js2DOM-light.js)  
Sous licence BSD 2 modifiée avec 3 ajouts:
```
* 1) Pour toute modification de ce projet, vous devez respecter la compatibilité
  ascendante avec ses dernières spécifications officielles à la date de sa
  première utilisation dans votre projet ou demander une autorisation écrite
  préalable spécifique.

* Dans vos sources : 
  - 2) Vous devez conserver le nom de la fonction principale "js2DOMlight".
    Mais vous pouvez créer un alias.
  - 3) Vous devez conserver la ligne de commentaire précédant la déclaration de la
    fonction principale "js2DOMlight".
```

## light?
Un code source en version light est très court.  
Il a pour vocation à être copié et utilisé tel-quel dans un autre code source.  
Il représente souvent une version simplifiée d'un autre projet.  

### Nom
js2DOM aurait du s'appeler js2Html car il manipule essentiellement du html.
DOM au lieu de Html a été choisi car js2Html est déja bien utilisé.
le choix de DOM montre que ce projet est orienté `front` bien qu'il puisse aussi servir en `back`.     
L'abréviation du nom en version light est est **j2dl**  

### use  
Pour l'instant vous pouvez regarder un simple exemple-test [src/use/sample/first test.html](src/use/sample/first%20test.html) 
en voici un extrait
```javascript
o = js2DOMlight()
    .div()
        ("inner dans div")()
        ("aprés br texte").
    _("suite aprés div").
    hr()
    ()
    .span()
        ("test span").
    _("suite après span")
```   
donne en html (formaté)
```html 
    <div>
        inner dans div<br />
        aprés br texte
    </div>
    suite aprés div
    <hr /><br />
    <span>
        test span
    </span>
    suite après span
```  
