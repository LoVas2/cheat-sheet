# Install

- oh-my-zsh ``sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"``
- powerlevel10k
- zsh-autosuggestions
- zsh-syntax-highlighting

[All Setup](https://www.robinwieruch.de/mac-setup-web-development/)

# Java
- Java is intalled here : ``/Library/Java/JavaVirtualMachines/``
- List installed JDKs ``/usr/libexec/java_home -V``
- Switch Java version ``export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_251``
  - Check that zsh is taking new JAVA_HOME in config file
  - Check that mvn is taking new JAVA_HOME ``mvn -version``

# Brew

``brew services list`` : liste des services installés

# MySQL

sudo vi /etc/my.cnf

vi ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist

# Conf SSH
sudo vi /private/etc/ssh/ssh_config

```
Host bastion
        User lvasseur
        # Host
        Hostname 10.51.xx.xx
        # Clé SSH
        IdentityFile ~/.ssh/fft_loic
        # Double tunnel vers les serveurs cibles
        LocalForward 127.0.0.1:9096 xxxx.amazonaws.com:9096
        LocalForward 127.0.0.5:2182 xxxx.amazonaws.com:2182
        DynamicForward 8888
```

### Ajouter des localhost 
````shell
#!/bin/bash
for ((i=2;i<6;i++))
do
  sudo ifconfig lo0 alias 127.0.0.$i up
done
````
ou https://superuser.com/a/1618532