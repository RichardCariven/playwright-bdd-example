import json
import sys


def generate_packages_markdown_table(json_content):
    markdown_table = "OS Packages\n| Name | Version | Vulnerabilities |\n|------|---------|-----------------|\n"

    for package in json_content["osPackages"]:
        vulnerabilities = package["vulnerabilities"]
        vulnerabilities_str = "<br>".join(
            [
                f"[{vuln['name']}]({vuln['source']}) ({vuln['severity']})"
                for vuln in vulnerabilities
            ]
        )
        markdown_table += (
            f"| {package['name']} | {package['version']} | {vulnerabilities_str} |\n"
        )

    return markdown_table


def generate_libraries_markdown_table(json_content):
    markdown_table = "Libraries\n| Name | Version | Vulnerabilities |\n|------|---------|-----------------|\n"

    for library in json_content["libraries"]:
        vulnerabilities = library["vulnerabilities"]
        vulnerabilities_str = "<br>".join(
            [
                f"[{vuln['name']}]({vuln['source']}) ({vuln['severity']})"
                for vuln in vulnerabilities
            ]
        )
        markdown_table += (
            f"| {library['name']} | {library['version']} | {vulnerabilities_str} |\n"
        )

    return markdown_table


def generate_secrets_markdown_table(json_content):
    markdown_table = (
        "Secrets\n| Type | Path | Description |\n|------|---------|-----------------|\n"
    )

    for secret in json_content["secrets"]:
        markdown_table += (
            f"| {secret['type']} | {secret['path']} | {secret['description']} |\n"
        )

    return markdown_table


if __name__ == "__main__":
    with open(sys.argv[1], "r") as json_file:
        json_content = json.load(json_file)["result"]

    # If the JSON file does not contain any of the following keys, the
    # corresponding table will not be generated
    markdown_packages_table = ""
    markdown_libraries_table = ""
    markdown_secrets_table = ""

    if (
        "osPackages" in json_content
        and json_content["osPackages"] is not None
        and json_content["osPackages"] != []
    ):
        markdown_packages_table = generate_packages_markdown_table(json_content)
    if (
        "libraries" in json_content
        and json_content["libraries"] is not None
        and json_content["libraries"] != []
    ):
        markdown_libraries_table = generate_libraries_markdown_table(json_content)
    if (
        "secrets" in json_content
        and json_content["secrets"] is not None
        and json_content["secrets"] != []
    ):
        markdown_secrets_table = generate_secrets_markdown_table(json_content)

    print(markdown_packages_table)
    print("\n", markdown_libraries_table)
    print("\n", markdown_secrets_table)
