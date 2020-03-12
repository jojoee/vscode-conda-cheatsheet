let sections = [{
  name: 'Getting Started',
  commands: [
    {
      desc: 'Verify Conda is installed, check version number',
      code: 'conda info'
    },
    {
      desc: 'Update Conda to the current version',
      code: 'conda update -n base conda'
    },
    {
      desc: 'Update all packages to teh latest version of Anaconda. Will install stable and compatible versions, not necessarily the very latest.',
      code: 'conda update anaconda'
    }
  ]
}, {
  name: 'Working with Environments',
  commands: [
    {
      desc: 'Create a new environment named ENVNAME with specific version of Python and packages installed.',
      code: 'conda create --name <ENVNAME> python=3.6 "PKG1>7.6" PKG2'
    },
    {
      desc: 'Activate a named Conda environment',
      code: 'conda activate ENVNAME'
    },
    {
      desc: 'Activate a Conda environment at particular location on disk',
      code: 'conda activate /path/to/environment-dir'
    },
    {
      desc: 'Deactivate current environment',
      code: 'conda deactivate'
    },
    {
      desc: 'List all packages and versions in the active environment',
      code: 'conda list'
    },
    {
      desc: 'List all packages and versions in the named environment',
      code: 'conda list --name ENVNAME'
    },
    {
      desc: 'List all revisions made within the active environment',
      code: 'conda list --revisions'
    },
    {
      desc: 'List all revisions made in a specified environment',
      code: 'conda list --name ENVNAME --revisions'
    },
    {
      desc: 'Delete an entire environment',
      code: 'conda remove --name ENVNAME --all'
    }
  ]
}, {
  name: 'Sharing Environments',
  commands: [
    {
      desc: 'Make an exact copy of an environment',
      code: 'conda create --clone ENVNAME --name NEWENV'
    },
    {
      desc: 'Export an environment to a YAML file that can be read on Windows, macOS, and Linux',
      code: 'conda env export --name ENVNAME > envname.yml'
    },
    {
      desc: 'Create an environment from YAML file',
      code: 'conda env create --file envname.yml'
    },
    {
      desc: 'Create an environment from the file named environment.yml in the current directory',
      code: 'conda env create'
    },
    {
      desc: 'Export an environment with exact package version for one OS',
      code: 'conda list --explicit > pkgs.txt'
    },
    {
      desc: 'Create an environment based on exact package versions',
      code: 'conda create --name NEWENV --file pkgs.txt'
    }
  ]
}, {
  name: 'Using Packages and Channels',
  commands: [
    {
      desc: 'Search for a package in currently configured channels with version range >=3.1.0, <3.2"',
      code: 'conda search PKGNAME=3.1 "PKGNAME [version=\'>=3.1.0,<3.2\']"'
    },
    {
      desc: 'Find a package on all channels using the Anaconda Client',
      code: 'anaconda search FUZZYNAME'
    },
    {
      desc: 'Install package from a specific channel',
      code: 'conda install conda-forge::PKGNAME'
    },
    {
      desc: 'Install a package by exact version number (3.1.4)',
      code: 'conda install PKGNAME==3.1.4'
    },
    {
      desc: 'Install one of the listed versions (OR)',
      code: 'conda install "PKGNAME[version=\'3.1.2|3.1.4\']"'
    },
    {
      desc: 'Install following several constraints (AND)',
      code: 'conda install "PKGNAME>2.5,<3.2"'
    },
    {
      desc: 'Add a channel to your Conda configuration',
      code: 'conda config --add channels CHANNELNAME'
    }
  ]
}, {
  name: 'Additional Useful Hints',
  commands: [
    {
      desc: 'Detailed information about package versions',
      code: 'conda search PKGNAME --info'
    },
    {
      desc: 'Remove unused cached files including unused packages',
      code: 'conda clean --all'
    },
    {
      desc: 'Remove a package from an environment',
      code: 'conda uninstall PKGNAME --name ENVNAME'
    },
    {
      desc: 'Update all packages within an environment',
      code: 'conda update --all --name ENVNAME'
    },
    {
      desc: 'Run most commands without requiring a user prompt. Useful for scripts.',
      code: 'conda install --yes PKG1 PKG2'
    },
    {
      desc: 'Examine Conda configuration',
      code: 'conda config --show'
    },
    {
      desc: 'Examine Conda configuration services',
      code: 'conda config --show-sources'
    }
  ]
}]

// mutable
sections = sections.map(section => {
  return {
    ...section,
    href: section.name.replace(/\s+/g, '-').toLowerCase()
  }
})

export const SECTIONS = sections
