# Tech tree

## Description
This doc outlines my apps and their connections. Some kind of simplified service architecture and discovery.

## Connections
- Github connects to WL AWS account using OIDC role in test-infrastructure stack in Frankfurt. This is necessary for GitHub to be able to deploy apps using short-lived access.