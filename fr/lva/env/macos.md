# Install

- oh-my-zsh ``sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"``
- powerlevel10k
- zsh-autosuggestions
- zsh-syntax-highlighting

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
